# Docker Setup for Angular Lost & Found System

## 🐳 Docker Files Created

- **Dockerfile** - Multi-stage build for production Angular app
- **nginx.conf** - Nginx configuration with API proxy
- **.dockerignore** - Optimized Docker build context
- **docker-compose.yml** - Complete application stack

## 🚀 Quick Start

### Option 1: Docker Build & Run

```bash
# Build the Docker image
docker build -t angular-lost-found .

# Run the container
docker run -p 3000:80 angular-lost-found
```

### Option 2: Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build
```

## 🌐 Access Your Application

- **Angular Frontend:** http://localhost:3000
- **Java Backend:** http://localhost:8080 (when configured)

## ⚙️ Configuration

### API Proxy Configuration
The Nginx configuration automatically proxies `/api/*` requests to your Java backend:
- **Frontend:** `http://localhost:3000/api/items` 
- **Backend:** `http://host.docker.internal:8080/api/items`

### Docker Compose with Java Backend
Uncomment the `java-backend` service in `docker-compose.yml` and update:

```yaml
java-backend:
  image: your-java-api:latest  # Replace with your Java image
  ports:
    - "8080:8080"
  container_name: java-api-backend
  restart: unless-stopped
  networks:
    - app-network
```

## 📁 Docker Architecture

### Multi-Stage Build
1. **Stage 1 (node:18-alpine):** Build Angular app
2. **Stage 2 (nginx:alpine):** Serve with Nginx

### Features
- ✅ Production-optimized Angular build
- ✅ Nginx web server with gzip compression
- ✅ API proxy to Java backend
- ✅ CORS handling
- ✅ Angular routing support
- ✅ Security headers
- ✅ Static asset caching

## 🔧 Customization

### Environment Variables
Add environment-specific configurations:

```bash
# Production build with custom API URL
docker build --build-arg API_URL=https://your-api.com -t angular-lost-found .
```

### Nginx Configuration
Modify `nginx.conf` to:
- Change proxy target
- Add SSL/TLS support
- Modify security headers
- Update caching rules

## 📝 Commands Reference

```bash
# Build image
docker build -t angular-lost-found .

# Run container
docker run -p 3000:80 angular-lost-found

# Build with Docker Compose
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build --force-recreate
```

## 🔍 Troubleshooting

### Common Issues

**API calls failing:**
- Ensure Java backend is running on port 8080
- Check `nginx.conf` proxy configuration
- Verify CORS settings

**Build failures:**
- Clear Docker cache: `docker system prune -a`
- Check `.dockerignore` excludes `node_modules`
- Verify Node.js version compatibility

**Container won't start:**
- Check port conflicts: `docker ps`
- View container logs: `docker logs angular-lost-found`
- Verify Nginx configuration syntax

## 🏗️ Production Deployment

For production deployment:

1. **Update API URL** in Angular environment files
2. **Enable HTTPS** in nginx.conf
3. **Add health checks** to docker-compose.yml
4. **Set resource limits** for containers
5. **Configure logging and monitoring**

## 🔗 Integration with Java Backend

When your Java API is containerized, update `docker-compose.yml`:

```yaml
services:
  angular-frontend:
    depends_on:
      - java-backend
    
  java-backend:
    image: your-java-api:latest
    environment:
      - SPRING_PROFILES_ACTIVE=docker
    volumes:
      - java-data:/app/data
```

The Angular app will automatically connect to your Java API through the configured proxy!