import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntitlementsService } from './entitlements.service';
import { EntitlementsController } from './entitlements.controller';
import { ShopEntitlementsService } from './shop-entitlements.service';
import { ShopEntitlementsController } from './shop-entitlements.controller';
import { Entitlement, EntitlementSchema } from './schemas/entitlement.schema';
import {
  ShopEntitlement,
  ShopEntitlementSchema,
} from './schemas/shop-entitlement.schema';
import { Shop, ShopSchema } from '../shops/schemas/shop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entitlement.name, schema: EntitlementSchema },
      { name: ShopEntitlement.name, schema: ShopEntitlementSchema },
      { name: Shop.name, schema: ShopSchema },
    ]),
  ],
  controllers: [EntitlementsController, ShopEntitlementsController],
  providers: [EntitlementsService, ShopEntitlementsService],
  exports: [EntitlementsService, ShopEntitlementsService],
})
export class EntitlementsModule {}

