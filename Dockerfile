# Step 1: Build frontend with Vite
FROM node:20 AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Step 2: Run Express server
FROM node:20-slim AS server
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend, server, and service files
COPY --from=build /app/dist /app/dist
COPY server.js ./
COPY services/ ./services/

# Cloud Run expects the app to listen on $PORT
ENV PORT=8080
ENV NODE_ENV=production
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "server.js"]