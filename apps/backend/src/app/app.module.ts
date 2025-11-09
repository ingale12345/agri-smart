import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { ShopsModule } from '../modules/shops/shops.module';
import { BranchesModule } from '../modules/branches/branches.module';
import { InventoryModule } from '../modules/inventory/inventory.module';
import { OrdersModule } from '../modules/orders/orders.module';
import { DeliveryModule } from '../modules/delivery/delivery.module';
import { AnalyticsModule } from '../modules/analytics/analytics.module';
import { EntitlementsModule } from '../modules/entitlements/entitlements.module';
import { RolesModule } from '../modules/roles/roles.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGO_URI') ||
          'mongodb://localhost:27017/agri-smart',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ShopsModule,
    BranchesModule,
    InventoryModule,
    OrdersModule,
    DeliveryModule,
    AnalyticsModule,
    EntitlementsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
