import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum OrderType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
}

export type OrderItem = {
  productId: MongooseSchema.Types.ObjectId;
  name: string;
  quantity: number;
  unitPrice: number;
  gst: number;
  total: number;
};

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  customerId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', required: true })
  shopId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: false })
  branchId?: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      {
        productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
        name: String,
        quantity: Number,
        unitPrice: Number,
        gst: Number,
        total: Number,
      },
    ],
    required: true,
  })
  items: OrderItem[];

  @Prop({ required: true, default: 0 })
  subtotal: number;

  @Prop({ required: true, default: 0 })
  gst: number;

  @Prop({ required: true, default: 0 })
  totalAmount: number;

  @Prop({ required: true, default: 0 })
  discount: number; // Subsidy discount

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Prop({
    type: String,
    enum: OrderType,
    required: true,
  })
  orderType!: OrderType;

  @Prop({ required: false })
  deliveryAddress?: string;

  @Prop({ required: false })
  invoiceNumber?: string;

  @Prop({ required: false })
  notes?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ invoiceNumber: 1 }, { unique: true, sparse: true });

