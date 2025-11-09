import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus, OrderType } from './schemas/order.schema';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { Product, ProductDocument } from '../inventory/schemas/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  generateInvoiceNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INV-${timestamp}-${random}`;
  }

  async create(createOrderDto: CreateOrderDto, currentUser: any) {
    // Validate products and calculate totals
    const orderItems = [];
    let subtotal = 0;
    let totalGST = 0;

    for (const item of createOrderDto.items) {
      const product = await this.productModel.findById(item.productId).exec();

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      // Check stock availability
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}`,
        );
      }

      // Verify product belongs to the shop
      if (product.shopId.toString() !== createOrderDto.shopId) {
        throw new BadRequestException(
          `Product ${product.name} does not belong to this shop`,
        );
      }

      const unitPrice = product.price;
      const itemSubtotal = unitPrice * item.quantity;
      const itemGST = (itemSubtotal * product.gst) / 100;
      const itemTotal = itemSubtotal + itemGST;

      subtotal += itemSubtotal;
      totalGST += itemGST;

      orderItems.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        unitPrice,
        gst: product.gst,
        total: itemTotal,
      });

      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }

    const discount = createOrderDto.discount || 0;
    const totalAmount = subtotal + totalGST - discount;

    const order = new this.orderModel({
      customerId: currentUser.id,
      shopId: createOrderDto.shopId,
      branchId: createOrderDto.branchId,
      items: orderItems,
      subtotal,
      gst: totalGST,
      totalAmount,
      discount,
      orderType: createOrderDto.orderType,
      deliveryAddress:
        createOrderDto.orderType === OrderType.DELIVERY
          ? createOrderDto.deliveryAddress
          : undefined,
      status: OrderStatus.PENDING,
      invoiceNumber: this.generateInvoiceNumber(),
      notes: createOrderDto.notes,
    });

    return order.save();
  }

  async findAll(shopId?: string, currentUser?: any) {
    const query: any = {};

    // CUSTOMER can only see their own orders
    if (currentUser?.role === 'CUSTOMER') {
      query.customerId = currentUser.id;
    } else if (shopId) {
      query.shopId = shopId;
    } else if (currentUser?.role === 'SHOP_ADMIN' || currentUser?.role === 'STAFF') {
      query.shopId = currentUser.shopId;
    }

    return this.orderModel
      .find(query)
      .populate('customerId', 'name email')
      .populate('shopId', 'name code')
      .populate('branchId', 'name')
      .populate('items.productId', 'name sku imageUrl')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, currentUser: any) {
    const order = await this.orderModel
      .findById(id)
      .populate('customerId', 'name email phone address')
      .populate('shopId', 'name code address contact')
      .populate('branchId', 'name location')
      .populate('items.productId', 'name sku imageUrl unit')
      .exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // CUSTOMER can only access their own orders
    if (
      currentUser.role === 'CUSTOMER' &&
      order.customerId.toString() !== currentUser.id
    ) {
      throw new ForbiddenException('Access denied');
    }

    // SHOP_ADMIN and STAFF can only access orders from their shop
    if (
      (currentUser.role === 'SHOP_ADMIN' || currentUser.role === 'STAFF') &&
      order.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return order;
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
    currentUser: any,
  ) {
    const order = await this.orderModel.findById(id).exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Only shop staff can update order status
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      currentUser.role !== 'SHOP_ADMIN' &&
      currentUser.role !== 'STAFF'
    ) {
      throw new ForbiddenException('You cannot update order status');
    }

    // SHOP_ADMIN and STAFF can only update orders from their shop
    if (
      (currentUser.role === 'SHOP_ADMIN' || currentUser.role === 'STAFF') &&
      order.shopId.toString() !== currentUser.shopId
    ) {
      throw new ForbiddenException('Access denied');
    }

    order.status = updateOrderStatusDto.status;
    if (updateOrderStatusDto.notes) {
      order.notes = updateOrderStatusDto.notes;
    }

    return order.save();
  }

  async getInvoice(id: string, currentUser: any) {
    const order = await this.findOne(id, currentUser);
    return order; // Invoice data is already in the order document
  }
}

