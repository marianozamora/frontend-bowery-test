# Multi-stage Docker build
FROM node:20-alpine AS base

# Install yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Development stage
FROM base AS development

# Copy source code
COPY . .

# Expose development port
EXPOSE 5173

# Default command for development
CMD ["yarn", "dev", "--host", "0.0.0.0"]

# Build stage
FROM base AS build

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine AS production

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]