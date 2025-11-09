# AgriSmart Backend API

Complete SaaS API for AgriSmart built with NestJS, MongoDB, JWT Auth, Role-based Access Control, and Enterprise-level Entitlement Management System.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Multiple user roles (SUPER_ADMIN, SHOP_ADMIN, STAFF, DELIVERY, CUSTOMER)
- **Role & Entitlement System**: Enterprise-level permission management with granular access control
- **Shop Management**: Multi-tenant shop system with branches
- **Product Inventory**: Product management with GST calculation
- **Order Management**: Order placement with delivery/pickup options and invoice generation
- **Delivery Tracking**: Real-time delivery tracking with location updates
- **Analytics**: Sales analytics by product, category, season, and delivery type
- **API Documentation**: Swagger/OpenAPI documentation at `/api/docs`

## 📋 Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS
- **Password Hashing**: bcrypt

## 📦 Installation

```bash
# Install dependencies
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/agri-smart
JWT_SECRET=your-secret-key-change-in-production
PORT=3000
```

## 🏃 Running the Application

### Development Mode

```bash
# Using npm script
npm run backend

# Or using nx directly
nx serve backend

# Or with specific configuration
nx serve backend --configuration=development
```

### Production Mode

```bash
# Build the application
npm run backend:build
# Or
nx build backend

# Start the production server
npm run backend:start
# Or
node dist/apps/backend/main.js
```

## 🌱 Seeding Database

Run the seed script to create a SUPER_ADMIN user, categories, and default entitlements:

```bash
# Using npm script (recommended)
npm run backend:seed

# Or using ts-node directly
ts-node apps/backend/src/seed.ts

# Or using nx
npx ts-node apps/backend/src/seed.ts
```

**Default SUPER_ADMIN credentials:**
- Email: `admin@agrismart.com`
- Password: `admin123`

**Default Entitlements Created:**
- INV_MGMT - Inventory Management
- ORD_MGMT - Order Management
- DEL_MGMT - Delivery Management
- ANALYTICS - Analytics & Reports
- USER_MGMT - User Management
- ROLE_MGMT - Role Management

## 📚 API Documentation

Swagger documentation is available at:
```
http://localhost:3000/api/docs
```

## 🔐 User Roles

1. **SUPER_ADMIN**: Full system access, can create shops, categories, entitlements, and all user types
2. **SHOP_ADMIN**: Manage their shop, create roles, assign entitlements to roles, manage products and orders
3. **STAFF**: Access based on assigned role permissions
4. **DELIVERY**: View and update delivery status, update location
5. **CUSTOMER**: Place orders, view own orders

## 🔑 Role & Entitlement System

The system provides enterprise-level access control:

1. **Entitlements**: Functional modules (e.g., Inventory Management, Order Management)
2. **Shop Entitlements**: Entitlements assigned to shops by SUPER_ADMIN
3. **Roles**: Custom roles created by SHOP_ADMIN with permission mapping
4. **User Permissions**: Users inherit permissions from their assigned role

See [ROLE_MANAGEMENT.md](./ROLE_MANAGEMENT.md) for detailed documentation.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/shop/login` - Shop-specific login (for shop admin, staff, delivery)

### Users
- `GET /api/users` - Get all users (SUPER_ADMIN, SHOP_ADMIN)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (SUPER_ADMIN, SHOP_ADMIN)
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Categories
- `GET /api/categories` - Get all categories (Public)
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (SUPER_ADMIN only)
- `PATCH /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Shops
- `GET /api/shops` - Get all shops (Public)
- `GET /api/shops/:id` - Get shop by ID (Public)
- `GET /api/shops/code/:code` - Get shop by code (Public)
- `POST /api/shops` - Create shop (SUPER_ADMIN only)
- `PATCH /api/shops/:id` - Update shop
- `DELETE /api/shops/:id` - Delete shop

### Branches
- `GET /api/branches` - Get all branches
- `GET /api/branches/:id` - Get branch by ID
- `POST /api/branches` - Create branch (SUPER_ADMIN, SHOP_ADMIN)
- `PATCH /api/branches/:id` - Update branch
- `DELETE /api/branches/:id` - Delete branch

### Inventory/Products
- `GET /api/inventory` - Get all products (Public)
- `GET /api/inventory/:id` - Get product by ID (Public)
- `POST /api/inventory` - Create product (SUPER_ADMIN, SHOP_ADMIN) - Requires INV_MGMT:create
- `PATCH /api/inventory/:id` - Update product - Requires INV_MGMT:update
- `DELETE /api/inventory/:id` - Delete product - Requires INV_MGMT:delete

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order (CUSTOMER, SUPER_ADMIN)
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/:id/invoice` - Get order invoice

### Delivery
- `GET /api/delivery` - Get all deliveries
- `GET /api/delivery/:id` - Get delivery by ID
- `POST /api/delivery` - Create delivery tracking
- `PATCH /api/delivery/:id` - Update delivery
- `PATCH /api/delivery/:id/assign` - Assign delivery agent

### Analytics
- `GET /api/analytics/sales-by-product` - Sales by product
- `GET /api/analytics/sales-by-category` - Sales by category
- `GET /api/analytics/pickup-vs-delivery` - Pickup vs delivery ratio
- `GET /api/analytics/revenue` - Overall revenue
- `GET /api/analytics/sales-by-season` - Sales by season/month

### Entitlements (Super Admin Only)
- `POST /api/entitlements` - Create entitlement
- `GET /api/entitlements` - List all entitlements
- `GET /api/entitlements/:id` - Get entitlement by ID
- `GET /api/entitlements/code/:code` - Get entitlement by code
- `PATCH /api/entitlements/:id` - Update entitlement
- `DELETE /api/entitlements/:id` - Delete entitlement

### Shop Entitlements (Super Admin Only)
- `POST /api/shops/:shopId/entitlements` - Assign entitlement to shop
- `POST /api/shops/:shopId/entitlements/bulk` - Assign multiple entitlements
- `GET /api/shops/:shopId/entitlements` - Get shop entitlements
- `PATCH /api/shops/:shopId/entitlements/:entitlementId/permissions` - Update permissions
- `DELETE /api/shops/:shopId/entitlements/:entitlementId` - Remove entitlement

### Roles (Shop Admin)
- `POST /api/roles/shop/:shopId` - Create role
- `GET /api/roles/shop/:shopId` - List shop roles
- `GET /api/roles/:id` - Get role by ID
- `PATCH /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role
- `POST /api/roles/users/:userId/role/:roleId` - Assign role to user
- `DELETE /api/roles/users/:userId/role` - Remove role from user

## 🛡️ Access Control

### Role-Based Access Control (RBAC)
- Guards are applied globally but can be bypassed with `@Public()` decorator
- Use `@Roles()` decorator to specify allowed roles for endpoints
- Use `@User()` decorator to access current user in controllers

### Entitlement-Based Access Control
- Use `@Entitlement('ENTITLEMENT_CODE', 'permission')` decorator for granular permissions
- EntitlementGuard validates user permissions against required entitlements
- SUPER_ADMIN has access to all endpoints regardless of entitlements

### Example Usage

```typescript
// Protect endpoint with role and entitlement
@Post()
@UseGuards(JwtAuthGuard, RolesGuard, EntitlementGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
@Entitlement('INV_MGMT', 'create')
@ApiBearerAuth('JWT-auth')
create(@Body() createDto: CreateDto) {
  // Only users with create permission for INV_MGMT can access
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── app.module.ts
│   ├── app.controller.ts
│   └── app.service.ts
├── common/
│   ├── decorators/
│   │   ├── user.decorator.ts
│   │   ├── roles.decorator.ts
│   │   ├── public.decorator.ts
│   │   └── entitlement.decorator.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   └── entitlement.guard.ts
│   ├── interceptors/
│   │   └── transform.interceptor.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── dto/
│       └── api-response.dto.ts
├── modules/
│   ├── auth/
│   ├── users/
│   ├── categories/
│   ├── shops/
│   ├── branches/
│   ├── inventory/
│   ├── orders/
│   ├── delivery/
│   ├── analytics/
│   ├── entitlements/
│   └── roles/
├── main.ts
└── seed.ts
```

## 🔧 Development

### Adding a New Module

1. Create module folder under `src/modules/`
2. Create schema, DTOs, service, controller, and module files
3. Import the module in `app.module.ts`
4. Add Swagger decorators for API documentation
5. Add entitlement checks if needed

### Testing

```bash
# Unit tests
npm run test:backend
# Or
nx test backend

# E2E tests
nx e2e backend-e2e
```

### Linting

```bash
# Lint the backend
npm run lint:backend
# Or
nx lint backend
```

## 📝 Workflow Examples

### 1. Setting Up a New Shop

```bash
# 1. Login as SUPER_ADMIN
POST /api/auth/login
{
  "email": "admin@agrismart.com",
  "password": "admin123"
}

# 2. Create a shop
POST /api/shops
{
  "name": "My Shop",
  "code": "MYSHOP",
  "address": "123 Main St",
  "email": "shop@example.com"
}

# 3. Assign entitlements to shop
POST /api/shops/{shopId}/entitlements/bulk
{
  "entitlements": [
    {
      "entitlementId": "inv_mgmt_id",
      "allowedPermissions": {
        "read": true,
        "create": true,
        "update": true,
        "delete": true,
        "download": true
      }
    }
  ]
}

# 4. Create SHOP_ADMIN user
POST /api/users
{
  "email": "shopadmin@example.com",
  "password": "password123",
  "name": "Shop Admin",
  "role": "SHOP_ADMIN",
  "shopId": "shop_id"
}
```

### 2. Shop Admin Creating Roles

```bash
# 1. Login as SHOP_ADMIN
POST /api/auth/shop/login
{
  "email": "shopadmin@example.com",
  "password": "password123",
  "shopId": "shop_id"
}

# 2. Create a role
POST /api/roles/shop/{shopId}
{
  "roleName": "Inventory Manager",
  "roleCode": "INV_MANAGER",
  "entitlementPermissions": [
    {
      "entitlementCode": "INV_MGMT",
      "entitlementName": "Inventory Management",
      "moduleCode": "INV_MGMT",
      "moduleName": "Inventory",
      "permissions": {
        "read": { "enabled": true, "isAllowed": true },
        "create": { "enabled": true, "isAllowed": true },
        "update": { "enabled": true, "isAllowed": true },
        "delete": { "enabled": true, "isAllowed": false },
        "download": { "enabled": true, "isAllowed": true }
      }
    }
  ]
}

# 3. Assign role to user
POST /api/roles/users/{userId}/role/{roleId}
```

## 🚨 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or `docker-compose up -d`
- Check MONGO_URI in `.env` file
- Verify MongoDB is accessible on the specified port

### JWT Token Issues
- Verify JWT_SECRET is set in `.env`
- Check token expiration (default: 7 days)
- Ensure token is sent in Authorization header: `Bearer <token>`

### Permission Denied Errors
- Verify user has the required role
- Check if user has the required entitlement permission
- Ensure role is assigned to the user
- Verify shop has the entitlement assigned

## 📖 Additional Documentation

- [Role Management System](./ROLE_MANAGEMENT.md) - Detailed documentation on entitlements and roles
- [Swagger API Docs](http://localhost:3000/api/docs) - Interactive API documentation

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For issues and questions, please open an issue on the repository.
