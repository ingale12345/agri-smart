import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Delivery,
  DeliveryDocument,
  DeliveryStatus,
} from './schemas/delivery.schema';
import { CreateDeliveryDto, UpdateDeliveryDto } from './dto/delivery.dto';
import { Order, OrderDocument, OrderType } from '../orders/schemas/order.schema';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name) private deliveryModel: Model<DeliveryDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto, currentUser: any) {
    const order = await this.orderModel.findById(createDeliveryDto.orderId).exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Only delivery orders can have delivery tracking
    if (order.orderType !== OrderType.DELIVERY) {
      throw new BadRequestException('Only delivery orders can have delivery tracking');
    }

    // Check if delivery already exists for this order
    const existingDelivery = await this.deliveryModel.findOne({
      orderId: createDeliveryDto.orderId,
    });

    if (existingDelivery) {
      throw new BadRequestException('Delivery already exists for this order');
    }

    const delivery = new this.deliveryModel({
      ...createDeliveryDto,
      status: DeliveryStatus.PENDING,
    });

    return delivery.save();
  }

  async findAll(shopId?: string, currentUser?: any) {
    const query: any = {};

    // DELIVERY agents can only see their own deliveries
    if (currentUser?.role === 'DELIVERY') {
      query.deliveryAgentId = currentUser.id;
    } else if (shopId) {
      // Filter by shop through orders
      const orders = await this.orderModel.find({ shopId }).select('_id').exec();
      query.orderId = { $in: orders.map((o) => o._id) };
    } else if (currentUser?.role === 'SHOP_ADMIN' || currentUser?.role === 'STAFF') {
      const orders = await this.orderModel
        .find({ shopId: currentUser.shopId })
        .select('_id')
        .exec();
      query.orderId = { $in: orders.map((o) => o._id) };
    }

    return this.deliveryModel
      .find(query)
      .populate('orderId')
      .populate('deliveryAgentId', 'name email phone')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, currentUser?: any) {
    const delivery = await this.deliveryModel
      .findById(id)
      .populate('orderId')
      .populate('deliveryAgentId', 'name email phone')
      .exec();

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    // DELIVERY agents can only access their own deliveries
    if (
      currentUser?.role === 'DELIVERY' &&
      delivery.deliveryAgentId?.toString() !== currentUser.id
    ) {
      throw new ForbiddenException('Access denied');
    }

    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto, currentUser: any) {
    const delivery = await this.deliveryModel.findById(id).exec();

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    // DELIVERY agents can only update status and location
    if (currentUser.role === 'DELIVERY') {
      if (delivery.deliveryAgentId?.toString() !== currentUser.id) {
        throw new ForbiddenException('Access denied');
      }

      // Delivery agents can only update status and location
      if (updateDeliveryDto.deliveryAgentId) {
        delete updateDeliveryDto.deliveryAgentId;
      }
    }

    // Update status to delivered
    if (
      updateDeliveryDto.status === DeliveryStatus.DELIVERED &&
      delivery.status !== DeliveryStatus.DELIVERED
    ) {
      updateDeliveryDto.deliveredAt = new Date();
    }

    Object.assign(delivery, updateDeliveryDto);
    return delivery.save();
  }

  async assignDeliveryAgent(id: string, deliveryAgentId: string, currentUser: any) {
    const delivery = await this.deliveryModel.findById(id).exec();

    if (!delivery) {
      throw new NotFoundException('Delivery not found');
    }

    // Only shop admins and staff can assign delivery agents
    if (
      currentUser.role !== 'SUPER_ADMIN' &&
      currentUser.role !== 'SHOP_ADMIN' &&
      currentUser.role !== 'STAFF'
    ) {
      throw new ForbiddenException('You cannot assign delivery agents');
    }

    delivery.deliveryAgentId = deliveryAgentId as any;
    delivery.status = DeliveryStatus.ASSIGNED;

    return delivery.save();
  }
}

