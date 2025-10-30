# Backend Starter Template

A production-ready Node.js Express backend starter template with enterprise-grade features, security, and comprehensive documentation for rapid API development.

## 🚀 Features

### Core Features
- **Express.js Server** with modern ES6+ modules
- **PostgreSQL Database** with Prisma ORM
- **JWT Authentication** with access/refresh tokens
- **Role-Based Access Control** with permissions system
- **Input Validation** with comprehensive schema validation
- **Security Middleware** (Helmet, CORS, Rate Limiting)
- **Comprehensive Logging** with Winston and Morgan
- **Error Handling** with custom error classes
- **Cookie-based Authentication** with secure HTTP-only cookies

### Security & Production Features
- **Rate Limiting** (100 requests per 5 minutes)
- **Request Compression** for better performance
- **Security Headers** with Helmet.js
- **Environment-based Configuration**
- **Telegram Error Notifications** for production monitoring
- **Request/Response Logging** with different levels per environment
- **SQL Injection Protection** via Prisma ORM
- **Password Hashing** with bcrypt

### Developer Experience
- **Module Path Aliases** (`@/` for `src/`)
- **Hot Reload** with Nodemon
- **Prettier Code Formatting**
- **Structured Project Architecture**
- **Comprehensive Documentation**

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── app.config.js          # Application configuration
│   ├── controllers/v1/             # API controllers
│   │   ├── Auth.controller.js      # Authentication logic
│   │   ├── User.controller.js      # User management
│   │   └── Permission.controller.js # Permission management
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT validation & RBAC
│   │   ├── logging.middleware.js   # Request/error logging
│   │   └── validation.middleware.js # Input validation
│   ├── routes/v1/                  # API routes
│   │   ├── auth.routes.js          # Authentication endpoints
│   │   ├── users.routes.js         # User endpoints
│   │   └── permissions.routes.js   # Permission endpoints
│   ├── service/
│   │   ├── core/
│   │   │   ├── CustomResponse.js   # Standardized API responses
│   │   │   └── notifier.service.js # Telegram notifications
│   │   └── v1/                     # Business logic services
│   ├── schema/
│   │   └── validation.schema.js    # Input validation schemas
│   └── utils/
│       ├── constants/              # Application constants
│       ├── helpers/                # Utility functions
│       └── mock/                   # Mock data for development
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.js                    # Database seeding
├── docs/                          # Integration guides
├── logs/                          # Application logs
├── .github/workflows/             # CI/CD configuration
└── app.js                         # Application entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/CoderLovely08/Backend-Starter
   cd Backend-Starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.sample .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed database (optional)
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:3000`

### Environment Variables

Required environment variables (see `.env.sample`):

```env
# Server Configuration
PORT=3000
APPLICATION_NAME="Backend Starter"
NODE_ENV=development

# Database
DATABASE_URL="postgres://user:password@localhost:5432/database"

# JWT Secrets
JWT_ACCESS_TOKEN_SECRET=your-access-token-secret
JWT_REFRESH_TOKEN_SECRET=your-refresh-token-secret

# CORS Configuration
CORS_DEV_ORIGIN=http://localhost:5173
CORS_PROD_ORIGIN=https://your-production-domain.com
```

Optional integrations:
- **AWS S3**: File storage
- **Supabase**: Alternative file storage
- **SMTP**: Email notifications
- **Firebase**: Push notifications
- **Telegram**: Error notifications
- **Azure**: Cloud storage

## 🔒 Authentication & Authorization

### Authentication Flow
1. **User Registration/Login** → Receives JWT tokens
2. **Access Token** → Short-lived (1 day), stored in HTTP-only cookie
3. **Refresh Token** → Long-lived (7 days), stored in HTTP-only cookie
4. **Token Validation** → Middleware validates on protected routes

### Role-Based Access Control
- **User Types**: Defined in database (Admin, User, etc.)
- **Permissions**: Granular permissions system
- **Middleware Protection**: 
  - `validateToken` - JWT validation
  - `checkRole(['admin'])` - Role-based access
  - `checkPermissions('user.create')` - Permission-based access

### API Endpoints

#### Authentication
```
POST /api/v1/auth/login          # User login
POST /api/v1/auth/register       # User registration
POST /api/v1/auth/forgot-password # Password reset request
POST /api/v1/auth/reset-password  # Password reset
```

#### Protected Routes
```
GET  /api/v1/users              # Get users (requires auth)
POST /api/v1/users              # Create user (requires auth)
GET  /api/v1/permissions        # Get permissions
```

## 📊 Logging & Monitoring

### Logging Levels
- **Development**: Console + detailed logs
- **Production**: File-based + error notifications

### Log Files
- `logs/combined.log` - All application logs
- `logs/error.log` - Error logs only
- `logs/exceptions.log` - Unhandled exceptions
- `logs/rejections.log` - Promise rejections

### Telegram Notifications
Production errors automatically send notifications to configured Telegram chat with:
- Error message and stack trace
- Request details (method, path, body, query)
- User information
- Timestamp and environment

## 🚀 Deployment

### Production Deployment

1. **Server Setup** (Ubuntu/Debian)
   ```bash
   # Install Node.js, PM2, Nginx
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   sudo apt install nginx
   ```

2. **Application Deployment**
   ```bash
   # Clone and setup
   git clone <repository-url>
   cd backend
   npm install
   
   # Start with PM2
   pm2 start app.js --name "backend-api"
   pm2 save
   pm2 startup
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-api-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **SSL Certificate**
   ```bash
   sudo certbot --nginx -d your-api-domain.com
   ```

### Automated CI/CD
GitHub Actions workflow included for automatic deployment:
- Triggers on push to main branch
- SSH deployment to server
- Automatic dependency installation
- PM2 restart

## 🔧 Available Scripts

```bash
npm start        # Production server
npm run dev      # Development server with hot reload
npm run seed     # Seed database with initial data
npm run format   # Format code with Prettier
```

## 📚 Integration Guides

The `docs/` folder contains detailed integration guides:

1. **[Node Server Setup](docs/01%20Node%20Server.md)** - Basic server configuration and dependencies
2. **[Feature Integrations](docs/02%20Features.md)** - Complete guides for:
   - Supabase (file storage)
   - Nodemailer (email)
   - Multer (file uploads)
   - Firebase Admin SDK (push notifications)
   - AWS S3 (cloud storage)
   - Redis (caching)
   - Telegram notifications (error monitoring)
3. **[Subdomain Setup](docs/03%20Subdomain.md)** - DNS configuration for subdomains
4. **[Nginx Server Setup](docs/04%20Nginx%20Server%20Setup.md)** - Production server configuration with SSL
5. **[PM2 Setup](docs/05%20PM2%20Setup.md)** - Process management and monitoring
6. **[Deploy Key Setup](docs/06%20Deploy%20Key.md)** - SSH key configuration for deployment
7. **[Auto Deploy](docs/07%20Auto%20Deploy.md)** - GitHub Actions CI/CD pipeline

## 🏗️ Architecture Benefits

### Scalability
- **Modular Structure**: Easy to extend and maintain
- **Service Layer**: Business logic separation
- **Database ORM**: Type-safe queries with Prisma
- **Environment Configs**: Easy deployment across environments

### Security
- **JWT Implementation**: Secure authentication
- **Input Validation**: Prevents malicious data
- **Rate Limiting**: DDoS protection
- **Security Headers**: OWASP recommendations
- **Error Handling**: No sensitive data exposure

### Developer Experience
- **Hot Reload**: Fast development cycles
- **Module Aliases**: Clean import paths
- **Structured Logging**: Easy debugging
- **Comprehensive Documentation**: Quick onboarding
- **Code Formatting**: Consistent code style

### Production Ready
- **Error Monitoring**: Real-time notifications
- **Performance Optimization**: Compression & caching
- **Health Checks**: Application monitoring
- **Deployment Automation**: CI/CD pipeline
- **Database Migrations**: Version-controlled schema

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow existing code patterns
4. Add tests for new features
5. Update documentation
6. Submit a pull request

## 📄 License

ISC License - feel free to use this template for personal or commercial projects.

## 🆘 Support

For issues and questions:
1. Check the documentation in `docs/` folder
2. Review existing GitHub issues
3. Create a new issue with detailed description

---

**Built with ❤️ for rapid API development**
