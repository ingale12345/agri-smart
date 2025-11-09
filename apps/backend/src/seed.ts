import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './modules/auth/schemas/user.schema';
import { Category } from './modules/categories/schemas/category.schema';
import { Entitlement } from './modules/entitlements/schemas/entitlement.schema';
import { UserRole } from './common/decorators/roles.decorator';
import { Model } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get models from the app context
    const userModel = app.get(getModelToken(User.name)) as Model<User>;
    const categoryModel = app.get(
      getModelToken(Category.name)
    ) as Model<Category>;
    const entitlementModel = app.get(
      getModelToken(Entitlement.name)
    ) as Model<Entitlement>;

    // Seed SUPER_ADMIN user
    const existingAdmin = await userModel.findOne({
      email: 'admin@agrismart.com',
    });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new userModel({
        email: 'admin@agrismart.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: UserRole.SUPER_ADMIN,
        isActive: true,
      });
      await admin.save();
      console.log(
        '✅ SUPER_ADMIN user created: admin@agrismart.com / admin123'
      );
    } else {
      console.log('ℹ️  SUPER_ADMIN user already exists');
    }

    // Seed Categories
    const categories = [
      {
        name: 'AGRI',
        description: 'Agricultural products and supplies',
        imageUrl: 'https://example.com/images/agri.jpg',
      },
      {
        name: 'HARDWARE',
        description: 'Hardware tools and equipment',
        imageUrl: 'https://example.com/images/hardware.jpg',
      },
      {
        name: 'IRRIGATION',
        description: 'Irrigation systems and equipment',
        imageUrl: 'https://example.com/images/irrigation.jpg',
      },
      {
        name: 'SEEDS',
        description: 'Various types of seeds',
        imageUrl: 'https://example.com/images/seeds.jpg',
      },
      {
        name: 'FERTILIZERS',
        description: 'Fertilizers and soil nutrients',
        imageUrl: 'https://example.com/images/fertilizers.jpg',
      },
      {
        name: 'PESTICIDES',
        description: 'Pesticides and plant protection',
        imageUrl: 'https://example.com/images/pesticides.jpg',
      },
    ];

    for (const categoryData of categories) {
      const existingCategory = await categoryModel.findOne({
        name: categoryData.name,
      });
      if (!existingCategory) {
        const category = new categoryModel(categoryData);
        await category.save();
        console.log(`✅ Category created: ${categoryData.name}`);
      } else {
        console.log(`ℹ️  Category already exists: ${categoryData.name}`);
      }
    }

    // Seed Default Entitlements
    const entitlements = [
      {
        entitlementCode: 'INV_MGMT',
        entitlementName: 'Inventory Management',
        moduleCode: 'INV_MGMT',
        moduleName: 'Inventory',
        applicablePermissions: {
          read: { enabled: true },
          create: { enabled: true },
          update: { enabled: true },
          delete: { enabled: true },
          download: { enabled: true },
        },
        category: 'AGRI',
        description: 'Manage inventory, products, and stock',
      },
      {
        entitlementCode: 'ORD_MGMT',
        entitlementName: 'Order Management',
        moduleCode: 'ORD_MGMT',
        moduleName: 'Orders',
        applicablePermissions: {
          read: { enabled: true },
          create: { enabled: true },
          update: { enabled: true },
          delete: { enabled: false },
          download: { enabled: true },
        },
        category: 'AGRI',
        description: 'Manage orders and invoices',
      },
      {
        entitlementCode: 'DEL_MGMT',
        entitlementName: 'Delivery Management',
        moduleCode: 'DEL_MGMT',
        moduleName: 'Delivery',
        applicablePermissions: {
          read: { enabled: true },
          create: { enabled: true },
          update: { enabled: true },
          delete: { enabled: false },
          download: { enabled: false },
        },
        category: 'AGRI',
        description: 'Manage deliveries and tracking',
      },
      {
        entitlementCode: 'ANALYTICS',
        entitlementName: 'Analytics & Reports',
        moduleCode: 'ANALYTICS',
        moduleName: 'Analytics',
        applicablePermissions: {
          read: { enabled: true },
          create: { enabled: false },
          update: { enabled: false },
          delete: { enabled: false },
          download: { enabled: true },
        },
        category: 'AGRI',
        description: 'View analytics and generate reports',
      },
      {
        entitlementCode: 'USER_MGMT',
        entitlementName: 'User Management',
        moduleCode: 'USER_MGMT',
        moduleName: 'Users',
        applicablePermissions: {
          read: { enabled: true },
          create: { enabled: true },
          update: { enabled: true },
          delete: { enabled: true },
          download: { enabled: false },
        },
        category: 'SYSTEM',
        description: 'Manage users and roles',
      },
      {
        entitlementCode: 'ROLE_MGMT',
        entitlementName: 'Role Management',
        moduleCode: 'ROLE_MGMT',
        moduleName: 'Roles',
        applicablePermissions: {
          read: { enabled: true },
          create: { enabled: true },
          update: { enabled: true },
          delete: { enabled: true },
          download: { enabled: false },
        },
        category: 'SYSTEM',
        description: 'Manage roles and permissions',
      },
    ];

    for (const entitlementData of entitlements) {
      const existingEntitlement = await entitlementModel.findOne({
        entitlementCode: entitlementData.entitlementCode,
      });
      if (!existingEntitlement) {
        const entitlement = new entitlementModel(entitlementData);
        await entitlement.save();
        console.log(
          `✅ Entitlement created: ${entitlementData.entitlementName}`
        );
      } else {
        console.log(
          `ℹ️  Entitlement already exists: ${entitlementData.entitlementName}`
        );
      }
    }

    console.log('✅ Seed script completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();
