import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  imageUrl?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

