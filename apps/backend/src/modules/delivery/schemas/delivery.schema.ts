import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum DeliveryStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

export type DeliveryDocument = Delivery & Document;

@Schema({ timestamps: true })
export class Delivery {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true, unique: true })
  orderId!: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false })
  deliveryAgentId?: MongooseSchema.Types.ObjectId;

  @Prop({
    type: String,
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDING,
  })
  status!: DeliveryStatus;

  @Prop({ required: false })
  estimatedTime?: Date;

  @Prop({ required: false })
  deliveredAt?: Date;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
    },
    required: false,
  })
  location?: {
    lat: number;
    lng: number;
  };

  @Prop({ required: false })
  notes?: string;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);

