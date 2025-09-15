# Frontend Challenge Docker Setup

## 🐳 Docker Commands

### Development Mode

Start the development server with hot reload:

```bash
yarn docker:dev
```

Access the app at: http://localhost:5173

### Storybook Development

Start Storybook in development mode:

```bash
yarn docker:storybook
```

Access Storybook at: http://localhost:6006

### Production Mode

Build and serve the production-ready application:

```bash
yarn docker:prod
```

Access the app at: http://localhost:8080

### Build Only

Create a production build without running:

```bash
yarn docker:build
```

### Stop All Services

Stop and remove all Docker containers and volumes:

```bash
yarn docker:down
```

## 📁 Docker Architecture

### Multi-Stage Build

- **Base Stage**: Node.js 20 Alpine with Yarn
- **Development Stage**: Full development environment with hot reload
- **Build Stage**: Production build creation
- **Production Stage**: Nginx-served optimized build

### Services

- **frontend-dev**: Development server (port 5173)
- **storybook-dev**: Storybook development (port 6006)
- **frontend-prod**: Production Nginx server (port 8080)
- **frontend-build**: Build-only service for CI/CD

### Features

- 🔧 Hot reload in development
- 📦 Optimized production builds
- 🚀 Nginx with compression and security headers
- 🧪 Isolated testing environment
- 📚 Storybook containerization
- 🔒 Security best practices

## 🛠 Manual Docker Commands

If you prefer using Docker directly:

```bash
# Development
docker-compose --profile dev up --build

# Production
docker-compose --profile prod up --build

# Storybook
docker-compose --profile dev up storybook-dev --build

# Clean up
docker-compose down --volumes
```

## 📋 Requirements

- Docker and Docker Compose
- Yarn (for script execution)
