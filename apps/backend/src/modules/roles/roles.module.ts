import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role, RoleSchema } from './schemas/role.schema';
import { Shop, ShopSchema } from '../shops/schemas/shop.schema';
import {
  ShopEntitlement,
  ShopEntitlementSchema,
} from '../entitlements/schemas/shop-entitlement.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';
import { EntitlementsModule } from '../entitlements/entitlements.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: ShopEntitlement.name, schema: ShopEntitlementSchema },
      { name: User.name, schema: UserSchema },
    ]),
    EntitlementsModule,
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}

