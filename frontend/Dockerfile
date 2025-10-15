# ---- Build Stage ----
FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install --include=dev

# Copy rest of project files
COPY . .

# Ensure permissions are correct (helps when cache layers are reused)
RUN chmod -R 755 /app/node_modules

# Run Vite build directly through Node (avoids Alpine permission issue)
RUN node ./node_modules/vite/bin/vite.js build

# ---- Runtime Stage ----
FROM public.ecr.aws/docker/library/nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

