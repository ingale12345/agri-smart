import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  sku!: string;

  @Prop({ required: true })
  unit!: string; // kg, piece, liter, etc.

  @Prop({ required: true, default: 0 })
  price!: number;

  @Prop({ required: true, default: 0 })
  gst!: number; // GST percentage

  @Prop({ required: true, default: 0 })
  stock!: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId!: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', required: true })
  shopId!: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', required: false })
  branchId?: MongooseSchema.Types.ObjectId;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ required: false })
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ shopId: 1, sku: 1 }, { unique: true });
