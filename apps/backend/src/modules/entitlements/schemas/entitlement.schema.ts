import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntitlementDocument = Entitlement & Document;

export class PermissionConfig {
  enabled!: boolean;
}

export class ApplicablePermissions {
  read!: PermissionConfig;
  create!: PermissionConfig;
  update!: PermissionConfig;
  delete!: PermissionConfig;
  download!: PermissionConfig;
}

@Schema({ timestamps: true })
export class Entitlement {
  @Prop({ required: true, unique: true, uppercase: true })
  entitlementCode!: string;

  @Prop({ required: true })
  entitlementName!: string;

  @Prop({ required: true, uppercase: true })
  moduleCode!: string;

  @Prop({ required: true })
  moduleName!: string;

  @Prop({
    type: {
      read: { type: { enabled: Boolean }, default: { enabled: true } },
      create: { type: { enabled: Boolean }, default: { enabled: true } },
      update: { type: { enabled: Boolean }, default: { enabled: true } },
      delete: { type: { enabled: Boolean }, default: { enabled: true } },
      download: { type: { enabled: Boolean }, default: { enabled: false } },
    },
    default: {
      read: { enabled: true },
      create: { enabled: true },
      update: { enabled: true },
      delete: { enabled: true },
      download: { enabled: false },
    },
  })
  applicablePermissions!: ApplicablePermissions;

  @Prop({ required: false })
  category?: string;

  @Prop({ required: false })
  description?: string;
}

export const EntitlementSchema = SchemaFactory.createForClass(Entitlement);
EntitlementSchema.index({ entitlementCode: 1 }, { unique: true });
EntitlementSchema.index({ moduleCode: 1 });

