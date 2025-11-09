import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true, unique: true })
  code!: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ required: false })
  email?: string;

  @Prop({ required: false })
  contact?: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }],
    default: [],
  })
  categories!: MongooseSchema.Types.ObjectId[];

  @Prop({ required: false })
  logoUrl?: string;

  @Prop({
    type: {
      primary: String,
      secondary: String,
    },
    default: {},
  })
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
