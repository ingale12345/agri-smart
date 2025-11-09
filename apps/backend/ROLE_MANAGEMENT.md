# Role Management and Entitlement System

## Overview

The Role Management and Entitlement System provides enterprise-level access control for the AgriSmart platform. It allows SUPER_ADMIN to assign modules (entitlements) to shops, and SHOP_ADMIN to create custom roles with granular permissions for their users.

## Architecture

### 1. Entitlements (Modules)

Entitlements represent functional modules or features that can be assigned to shops. Each entitlement defines:
- **entitlementCode**: Unique identifier (e.g., 'INV_MGMT')
- **entitlementName**: Display name (e.g., 'Inventory Management')
- **applicablePermissions**: Which permissions are available (read, create, update, delete, download)

### 2. Shop Entitlements

When SUPER_ADMIN onboards a shop, they assign entitlements to that shop. Each shop entitlement specifies:
- Which entitlements the shop has access to
- What permissions are allowed for each entitlement

### 3. Roles

SHOP_ADMIN can create custom roles for their shop. Each role:
- References shop entitlements
- Defines which permissions are granted for each entitlement
- Can be assigned to multiple users

### 4. Users

Users can be assigned a role, which grants them the permissions defined in that role. Permissions are stored in the user document and included in JWT tokens.

## Data Flow

```
SUPER_ADMIN
  ↓ Creates Entitlements
  ↓ Assigns Entitlements to Shop
SHOP_ADMIN
  ↓ Creates Roles with Permission Mapping
  ↓ Assigns Role to Users
USERS
  ↓ Receive Permissions via JWT
  ↓ Access Controlled by EntitlementGuard
```

## API Endpoints

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

## Usage Examples

### 1. Super Admin Creates Entitlement

```bash
POST /api/entitlements
{
  "entitlementCode": "INV_MGMT",
  "entitlementName": "Inventory Management",
  "moduleCode": "INV_MGMT",
  "moduleName": "Inventory",
  "applicablePermissions": {
    "read": { "enabled": true },
    "create": { "enabled": true },
    "update": { "enabled": true },
    "delete": { "enabled": true },
    "download": { "enabled": true }
  },
  "category": "AGRI",
  "description": "Manage inventory, products, and stock"
}
```

### 2. Super Admin Assigns Entitlement to Shop

```bash
POST /api/shops/{shopId}/entitlements
{
  "entitlementId": "entitlement_id",
  "allowedPermissions": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true,
    "download": true
  }
}
```

### 3. Shop Admin Creates Role

```bash
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
```

### 4. Shop Admin Assigns Role to User

```bash
POST /api/roles/users/{userId}/role/{roleId}
```

### 5. Using EntitlementGuard in Controllers

```typescript
@Post()
@UseGuards(JwtAuthGuard, RolesGuard, EntitlementGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.SHOP_ADMIN)
@Entitlement('INV_MGMT', 'create')
@ApiBearerAuth('JWT-auth')
create(@Body() createDto: CreateDto) {
  // Only users with create permission for INV_MGMT can access
}
```

## Default Entitlements

The seed script creates the following default entitlements:

1. **INV_MGMT** - Inventory Management
2. **ORD_MGMT** - Order Management
3. **DEL_MGMT** - Delivery Management
4. **ANALYTICS** - Analytics & Reports
5. **USER_MGMT** - User Management
6. **ROLE_MGMT** - Role Management

## Permission Types

- **read**: View data
- **create**: Create new records
- **update**: Modify existing records
- **delete**: Remove records
- **download**: Export/download data

## Security Features

1. **Entitlement Validation**: Roles can only use entitlements assigned to their shop
2. **Permission Validation**: Role permissions are validated against shop entitlement permissions
3. **JWT Integration**: Permissions are included in JWT tokens for efficient access control
4. **Guard Protection**: EntitlementGuard checks permissions at the endpoint level
5. **Super Admin Bypass**: SUPER_ADMIN has access to all endpoints regardless of entitlements

## Best Practices

1. **Create Entitlements First**: Before assigning to shops, create all entitlements
2. **Assign During Onboarding**: Assign entitlements when creating/onboarding a shop
3. **Granular Roles**: Create specific roles for different job functions
4. **Least Privilege**: Grant minimum required permissions
5. **Regular Audits**: Review and update roles/permissions periodically

## Migration Notes

- Existing users without roles will have empty permissions array
- SHOP_ADMIN users can assign roles to their shop users
- SUPER_ADMIN can manage all entitlements and shop assignments
- Permissions are refreshed when user logs in (via JWT strategy)

