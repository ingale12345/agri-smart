import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from '../../../common/decorators/roles.decorator';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shop', default: null })
  shopId?: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Role', default: null })
  roleId?: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      {
        entitlementCode: String,
        moduleName: String,
        permissions: {
          read: Boolean,
          create: Boolean,
          update: Boolean,
          delete: Boolean,
          download: Boolean,
        },
      },
    ],
    default: [],
  })
  permissions?: Array<{
    entitlementCode: string;
    moduleName: string;
    permissions: {
      read: boolean;
      create: boolean;
      update: boolean;
      delete: boolean;
      download: boolean;
    };
  }>;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: null })
  phone?: string;

  @Prop({ default: null })
  address?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
