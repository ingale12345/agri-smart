import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ShopEntitlementDocument = ShopEntitlement & Document;

export class AllowedPermissions {
  read!: boolean;
  create!: boolean;
  update!: boolean;
  delete!: boolean;
  download!: boolean;
}

@Schema({ timestamps: true })
export class ShopEntitlement {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', required: true })
  shopId!: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Entitlement', required: true })
  entitlementId!: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, uppercase: true })
  entitlementCode!: string;

  @Prop({ required: true })
  moduleName!: string;

  @Prop({
    type: {
      read: { type: Boolean, default: true },
      create: { type: Boolean, default: true },
      update: { type: Boolean, default: true },
      delete: { type: Boolean, default: true },
      download: { type: Boolean, default: false },
    },
    default: {
      read: true,
      create: true,
      update: true,
      delete: true,
      download: false,
    },
  })
  allowedPermissions!: AllowedPermissions;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  assignedBy!: MongooseSchema.Types.ObjectId;
}

export const ShopEntitlementSchema = SchemaFactory.createForClass(ShopEntitlement);
ShopEntitlementSchema.index({ shopId: 1, entitlementId: 1 }, { unique: true });
ShopEntitlementSchema.index({ shopId: 1 });
ShopEntitlementSchema.index({ entitlementCode: 1 });

