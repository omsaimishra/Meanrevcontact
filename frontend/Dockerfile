# ---- Build Stage ----
FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app

# Copy dependency files first (cache friendly)
COPY package*.json ./

# Install dependencies (include dev)
RUN npm install --include=dev

# Copy source code
COPY . .

# Fix permissions
RUN chmod -R 755 /app/node_modules

# Rebuild esbuild to match Alpine environment
RUN npm rebuild esbuild

# Run Vite build directly via Node to avoid shell permission issues
RUN node ./node_modules/vite/bin/vite.js build

# ---- Runtime Stage ----
FROM public.ecr.aws/docker/library/nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

