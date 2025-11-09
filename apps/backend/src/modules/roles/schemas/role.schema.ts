import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RoleDocument = Role & Document;

export class PermissionStatus {
  enabled!: boolean;
  isAllowed!: boolean;
}

export class EntitlementPermission {
  entitlementCode!: string;
  entitlementName!: string;
  moduleCode!: string;
  moduleName!: string;
  permissions!: {
    read: PermissionStatus;
    create: PermissionStatus;
    update: PermissionStatus;
    delete: PermissionStatus;
    download: PermissionStatus;
  };
}

@Schema({ timestamps: true })
export class Role {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', required: true })
  shopId!: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  roleName!: string;

  @Prop({ required: true, uppercase: true })
  roleCode!: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy!: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      {
        entitlementCode: String,
        entitlementName: String,
        moduleCode: String,
        moduleName: String,
        permissions: {
          read: { enabled: Boolean, isAllowed: Boolean },
          create: { enabled: Boolean, isAllowed: Boolean },
          update: { enabled: Boolean, isAllowed: Boolean },
          delete: { enabled: Boolean, isAllowed: Boolean },
          download: { enabled: Boolean, isAllowed: Boolean },
        },
      },
    ],
    default: [],
  })
  entitlementPermissions!: EntitlementPermission[];

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ required: false })
  description?: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.index({ shopId: 1, roleCode: 1 }, { unique: true });
RoleSchema.index({ shopId: 1 });
RoleSchema.index({ roleCode: 1 });

