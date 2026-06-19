# Stage 1: Build the application
FROM node:22-slim AS builder

WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install all dependencies (including devDependencies) to build the typescript files
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Production runner
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy package manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the application port (NestJS defaults to 3001 in config)
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
