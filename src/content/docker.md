# Docker Cheatsheet

## Installation & Setup

### Install Docker
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# macOS (using Homebrew)
brew install --cask docker

# Windows
# Download Docker Desktop from docker.com
```

### Basic Commands
```bash
# Check version
docker --version
docker version

# System info
docker info
docker system df
docker system prune  # Clean up unused resources
```

## Images

### Working with Images
```bash
# Pull an image
docker pull nginx
docker pull nginx:1.21

# List images
docker images
docker image ls

# Remove images
docker rmi nginx
docker rmi $(docker images -q)  # Remove all images

# Build image from Dockerfile
docker build -t my-app .
docker build -t my-app:v1.0 .

# Tag an image
docker tag my-app:latest my-app:v1.0

# Push to registry
docker push my-app:v1.0

# Search for images
docker search nginx

# Image history
docker history nginx

# Inspect image
docker inspect nginx
```

## Containers

### Running Containers
```bash
# Run a container
docker run nginx
docker run -d nginx                    # Detached mode
docker run -it ubuntu bash            # Interactive with TTY
docker run --name web nginx           # Custom name
docker run -p 8080:80 nginx          # Port mapping
docker run -v /host/path:/container/path nginx  # Volume mount

# Run with environment variables
docker run -e ENV_VAR=value nginx

# Run with resource limits
docker run --memory="256m" --cpus="1.0" nginx

# Run and remove after exit
docker run --rm nginx

# Run in background with restart policy
docker run -d --restart=always nginx
```

### Container Management
```bash
# List containers
docker ps              # Running containers
docker ps -a           # All containers
docker ps -q           # Container IDs only

# Stop containers
docker stop container_name
docker stop $(docker ps -q)  # Stop all running

# Start/restart containers
docker start container_name
docker restart container_name

# Remove containers
docker rm container_name
docker rm $(docker ps -aq)   # Remove all containers

# Kill containers (force stop)
docker kill container_name

# Pause/unpause containers
docker pause container_name
docker unpause container_name
```

### Container Interaction
```bash
# Execute commands in running container
docker exec -it container_name bash
docker exec container_name ls /app

# View logs
docker logs container_name
docker logs -f container_name     # Follow logs
docker logs --tail 100 container_name

# Copy files
docker cp file.txt container_name:/path/
docker cp container_name:/path/file.txt ./

# Inspect container
docker inspect container_name

# View container stats
docker stats
docker stats container_name

# View processes in container
docker top container_name
```

## Dockerfile

### Basic Dockerfile
```dockerfile
# Use official base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set user (security best practice)
USER node

# Define startup command
CMD ["npm", "start"]
```

### Multi-stage Build
```dockerfile
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
EXPOSE 3000
CMD ["npm", "start"]
```

### Common Instructions
```dockerfile
# Base image
FROM ubuntu:20.04
FROM node:16-alpine
FROM scratch  # Empty base image

# Metadata
LABEL maintainer="you@example.com"
LABEL version="1.0"
LABEL description="My application"

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Arguments (build-time variables)
ARG BUILD_DATE
ARG VERSION=latest

# Working directory
WORKDIR /app

# Copy files/directories
COPY src/ ./src/
COPY package.json .
ADD https://example.com/file.tar.gz /tmp/

# Run commands
RUN apt-get update && apt-get install -y curl
RUN npm install
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Expose ports
EXPOSE 3000
EXPOSE 80 443

# Volumes
VOLUME ["/data"]

# User
USER 1001
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Entry point and command
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]
```

## Docker Compose

### Basic docker-compose.yml
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - app-network

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

### Compose Commands
```bash
# Start services
docker-compose up
docker-compose up -d           # Detached mode
docker-compose up --build     # Force rebuild

# Stop services
docker-compose down
docker-compose down -v        # Remove volumes
docker-compose stop

# View logs
docker-compose logs
docker-compose logs web       # Specific service

# Scale services
docker-compose up --scale web=3

# Execute commands
docker-compose exec web bash
docker-compose run web npm test

# Pull images
docker-compose pull

# Build services
docker-compose build
docker-compose build --no-cache
```

## Volumes

### Types of Volumes
```bash
# Named volumes
docker volume create my-volume
docker run -v my-volume:/data nginx

# Bind mounts (host directory)
docker run -v /host/path:/container/path nginx
docker run -v $(pwd):/app nginx

# Anonymous volumes
docker run -v /container/path nginx

# Tmpfs mounts (in-memory)
docker run --tmpfs /tmp nginx
```

### Volume Management
```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-volume

# Remove volumes
docker volume rm my-volume
docker volume prune  # Remove unused volumes

# Create volume with driver options
docker volume create --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.1 \
  --opt device=:/path/to/dir \
  my-nfs-volume
```

## Networks

### Network Types
```bash
# Bridge network (default)
docker network create my-bridge

# Host network
docker run --network host nginx

# None network (no networking)
docker run --network none nginx

# Custom bridge network
docker network create --driver bridge my-network
docker run --network my-network nginx
```

### Network Management
```bash
# List networks
docker network ls

# Inspect network
docker network inspect bridge

# Connect container to network
docker network connect my-network container_name

# Disconnect container from network
docker network disconnect my-network container_name

# Remove network
docker network rm my-network
docker network prune  # Remove unused networks
```

## Registry & Hub

### Docker Hub
```bash
# Login to Docker Hub
docker login

# Tag for Docker Hub
docker tag my-app username/my-app:v1.0

# Push to Docker Hub
docker push username/my-app:v1.0

# Pull from Docker Hub
docker pull username/my-app:v1.0

# Logout
docker logout
```

### Private Registry
```bash
# Run local registry
docker run -d -p 5000:5000 --name registry registry:2

# Tag for private registry
docker tag my-app localhost:5000/my-app

# Push to private registry
docker push localhost:5000/my-app

# Pull from private registry
docker pull localhost:5000/my-app
```

## Monitoring & Debugging

### Container Debugging
```bash
# Debug running container
docker exec -it container_name sh

# Debug stopped container
docker run -it --entrypoint sh image_name

# Check container processes
docker top container_name

# Monitor resource usage
docker stats container_name

# View port mappings
docker port container_name

# View container changes
docker diff container_name
```

### System Monitoring
```bash
# System-wide information
docker system df
docker system events
docker system info

# Container logs
docker logs --details container_name
docker logs --since="2h" container_name
docker logs --until="2021-01-01T00:00:00" container_name

# Export/Import containers
docker export container_name > container.tar
docker import container.tar new_image:tag

# Save/Load images
docker save image_name > image.tar
docker load < image.tar
```

## Security

### Security Best Practices
```dockerfile
# Use official base images
FROM node:16-alpine

# Don't run as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Use specific versions
FROM node:16.14.2-alpine

# Scan for vulnerabilities
# docker scan my-app:latest

# Use multi-stage builds
FROM node:16-alpine AS builder
# ... build steps
FROM node:16-alpine AS runtime
COPY --from=builder /app/dist ./dist

# Remove unnecessary packages
RUN apk del .build-deps

# Use COPY instead of ADD
COPY package.json .

# Set read-only root filesystem
docker run --read-only nginx
```

### Security Commands
```bash
# Scan image for vulnerabilities
docker scan image_name

# Run with limited privileges
docker run --user 1000:1000 nginx
docker run --cap-drop ALL nginx
docker run --no-new-privileges nginx

# Limit resources
docker run --memory="128m" --cpus="0.5" nginx

# Use secrets (Docker Swarm)
echo "my_secret" | docker secret create my_secret -
```

## Docker in Production

### Health Checks
```dockerfile
# In Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
```

```bash
# Runtime health check
docker run --health-cmd="curl -f http://localhost/" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  nginx
```

### Logging Configuration
```bash
# Configure logging driver
docker run --log-driver=json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  nginx

# Syslog driver
docker run --log-driver=syslog \
  --log-opt syslog-address=udp://host:port \
  nginx
```

### Resource Limits
```bash
# Memory limits
docker run --memory="512m" nginx
docker run --memory="1g" --memory-swap="2g" nginx

# CPU limits
docker run --cpus="1.5" nginx
docker run --cpu-shares=512 nginx

# Block I/O limits
docker run --device-read-bps /dev/sda:1mb nginx
docker run --device-write-bps /dev/sda:1mb nginx
```

## Useful One-liners

```bash
# Stop all containers
docker stop $(docker ps -q)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove dangling images
docker image prune

# Remove everything (containers, images, networks, volumes)
docker system prune -a

# Get container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name

# Follow logs of multiple containers
docker logs -f container1 & docker logs -f container2

# Run command in all running containers
docker ps -q | xargs -I {} docker exec {} command

# Copy files from all containers with specific image
docker ps --filter ancestor=nginx -q | xargs -I {} docker cp {}:/etc/nginx/nginx.conf ./nginx-{}.conf
```

## Best Practices

1. **Use official base images** - Start with trusted, maintained images
2. **Keep images small** - Use Alpine Linux, multi-stage builds
3. **Don't run as root** - Create and use non-root users
4. **Use specific tags** - Avoid `latest` in production
5. **Minimize layers** - Combine RUN commands when possible
6. **Use .dockerignore** - Exclude unnecessary files
7. **Scan for vulnerabilities** - Regularly scan images for security issues
8. **One process per container** - Follow the single responsibility principle
9. **Use health checks** - Monitor container health
10. **Version your images** - Tag images with meaningful versions
