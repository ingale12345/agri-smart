import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BranchDocument = Branch & Document;

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', required: true })
  shopId!: MongooseSchema.Types.ObjectId;

  @Prop({ required: false })
  location?: string;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
      radius: Number, // in meters
    },
    default: null,
  })
  geoTag?: {
    lat: number;
    lng: number;
    radius: number;
  };
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

