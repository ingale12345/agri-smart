# Backend Commands Reference

## 📋 Available Commands

### Development

```bash
# Start backend in development mode
npm run backend
# Or
nx serve backend

# Start with specific configuration
nx serve backend --configuration=development
```

### Building

```bash
# Build for production
npm run backend:build
# Or
nx build backend

# Build for development
nx build backend --configuration=development
```

### Running Production

```bash
# Start production server (after building)
npm run backend:start
# Or
node dist/apps/backend/main.js
```

### Database Seeding

```bash
# Seed database with default data
npm run backend:seed
# Or
ts-node apps/backend/src/seed.ts

# What gets seeded:
# - SUPER_ADMIN user (admin@agrismart.com / admin123)
# - Categories (AGRI, HARDWARE, IRRIGATION, SEEDS, FERTILIZERS, PESTICIDES)
# - Entitlements (INV_MGMT, ORD_MGMT, DEL_MGMT, ANALYTICS, USER_MGMT, ROLE_MGMT)
```

### Testing

```bash
# Run unit tests
npm run test:backend
# Or
nx test backend

# Run E2E tests
nx e2e backend-e2e
```

### Linting

```bash
# Lint the backend code
npm run lint:backend
# Or
nx lint backend
```

## 🔄 Complete Setup Workflow

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/agri-smart
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
EOF

# Start MongoDB (if not running)
# Option 1: Local MongoDB
mongod

# Option 2: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2. Seed Database

```bash
# Seed with default data
npm run backend:seed
```

### 3. Start Backend

```bash
# Start in development mode
npm run backend
```

### 4. Verify Setup

```bash
# Check if server is running
curl http://localhost:3000

# Access Swagger documentation
open http://localhost:3000/api/docs

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@agrismart.com",
    "password": "admin123"
  }'
```

## 🚀 Quick Start

```bash
# One-liner setup (after MongoDB is running)
npm install && npm run backend:seed && npm run backend
```

## 📝 Environment Variables

Required environment variables in `.env`:

```env
MONGO_URI=mongodb://localhost:27017/agri-smart
JWT_SECRET=your-super-secret-key-change-in-production
PORT=3000
```

## 🔍 Troubleshooting

### MongoDB Connection Error

```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Or check port
netstat -an | grep 27017
```

### Port Already in Use

```bash
# Change PORT in .env file
PORT=3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Seed Script Fails

```bash
# Make sure MongoDB is running
# Check MongoDB connection string in .env
# Verify ts-node is installed
npm install --save-dev ts-node
```

## 📚 Additional Resources

- [README.md](./README.md) - Complete documentation
- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [ROLE_MANAGEMENT.md](./ROLE_MANAGEMENT.md) - Role & entitlement system

