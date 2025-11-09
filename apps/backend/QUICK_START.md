# Quick Start Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or remote)
- npm or yarn

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/agri-smart
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
```

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Seed the Database

```bash
npm run backend:seed
```

This will create:
- SUPER_ADMIN user (admin@agrismart.com / admin123)
- Default categories (AGRI, HARDWARE, IRRIGATION, SEEDS, FERTILIZERS, PESTICIDES)
- Default entitlements (INV_MGMT, ORD_MGMT, DEL_MGMT, ANALYTICS, USER_MGMT, ROLE_MGMT)

### 5. Start the Backend Server

```bash
npm run backend
```

The server will start on `http://localhost:3000`

### 6. Access API Documentation

Open your browser and navigate to:
```
http://localhost:3000/api/docs
```

## Quick Test

### 1. Login as SUPER_ADMIN

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@agrismart.com",
    "password": "admin123"
  }'
```

### 2. Use the Token

Copy the `accessToken` from the response and use it in subsequent requests:

```bash
curl -X GET http://localhost:3000/api/entitlements \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Common Commands

```bash
# Start backend in development mode
npm run backend

# Build for production
npm run backend:build

# Start production server
npm run backend:start

# Seed database
npm run backend:seed

# Run tests
npm run test:backend

# Lint code
npm run lint:backend
```

## Next Steps

1. Create a shop using SUPER_ADMIN account
2. Assign entitlements to the shop
3. Create SHOP_ADMIN user for the shop
4. Login as SHOP_ADMIN and create roles
5. Assign roles to users
6. Test permission-based access control

For detailed information, see [README.md](./README.md) and [ROLE_MANAGEMENT.md](./ROLE_MANAGEMENT.md).

