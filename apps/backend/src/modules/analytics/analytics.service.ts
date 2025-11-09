import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus, OrderType } from '../orders/schemas/order.schema';
import { Product, ProductDocument } from '../inventory/schemas/product.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getSalesByProduct(shopId?: string, startDate?: Date, endDate?: Date) {
    const matchStage: any = {
      status: { $ne: OrderStatus.CANCELLED },
    };

    if (shopId) {
      matchStage.shopId = shopId;
    }

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const sales = await this.orderModel.aggregate([
      { $match: matchStage },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.total' },
          orderCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $project: {
          productId: '$_id',
          productName: '$product.name',
          categoryId: '$product.categoryId',
          totalQuantity: 1,
          totalRevenue: 1,
          orderCount: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    return sales;
  }

  async getSalesByCategory(shopId?: string, startDate?: Date, endDate?: Date) {
    const matchStage: any = {
      status: { $ne: OrderStatus.CANCELLED },
    };

    if (shopId) {
      matchStage.shopId = shopId;
    }

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const sales = await this.orderModel.aggregate([
      { $match: matchStage },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: '$product.categoryId',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.total' },
          orderCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          categoryId: '$_id',
          categoryName: '$category.name',
          totalQuantity: 1,
          totalRevenue: 1,
          orderCount: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    return sales;
  }

  async getPickupVsDeliveryRatio(shopId?: string, startDate?: Date, endDate?: Date) {
    const matchStage: any = {
      status: { $ne: OrderStatus.CANCELLED },
    };

    if (shopId) {
      matchStage.shopId = shopId;
    }

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const stats = await this.orderModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$orderType',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
    ]);

    const total = stats.reduce((sum, stat) => sum + stat.count, 0);
    const pickup = stats.find((s) => s._id === OrderType.PICKUP) || { count: 0, totalRevenue: 0 };
    const delivery = stats.find((s) => s._id === OrderType.DELIVERY) || { count: 0, totalRevenue: 0 };

    return {
      pickup: {
        count: pickup.count,
        percentage: total > 0 ? (pickup.count / total) * 100 : 0,
        revenue: pickup.totalRevenue,
      },
      delivery: {
        count: delivery.count,
        percentage: total > 0 ? (delivery.count / total) * 100 : 0,
        revenue: delivery.totalRevenue,
      },
      total,
    };
  }

  async getOverallRevenue(shopId?: string, startDate?: Date, endDate?: Date) {
    const matchStage: any = {
      status: { $ne: OrderStatus.CANCELLED },
    };

    if (shopId) {
      matchStage.shopId = shopId;
    }

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const revenue = await this.orderModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          totalGST: { $sum: '$gst' },
          totalDiscount: { $sum: '$discount' },
          averageOrderValue: { $avg: '$totalAmount' },
        },
      },
    ]);

    return revenue[0] || {
      totalRevenue: 0,
      totalOrders: 0,
      totalGST: 0,
      totalDiscount: 0,
      averageOrderValue: 0,
    };
  }

  async getSalesBySeason(shopId?: string, year?: number) {
    const matchStage: any = {
      status: { $ne: OrderStatus.CANCELLED },
    };

    if (shopId) {
      matchStage.shopId = shopId;
    }

    if (year) {
      matchStage.createdAt = {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      };
    }

    const sales = await this.orderModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    return sales;
  }
}

