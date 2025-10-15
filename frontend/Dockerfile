# ---- Build Stage ----
FROM public.ecr.aws/docker/library/node:20-slim AS build
WORKDIR /app

# Copy package files first (better cache)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy everything else
COPY . .

# --- 🔧 FIX: Ensure vite is executable ---
RUN chmod -R 755 node_modules/.bin

# --- 🔧 FIX: Run vite via Node directly (bypasses shell script) ---
RUN node ./node_modules/vite/bin/vite.js build

# ---- Runtime Stage ----
FROM public.ecr.aws/docker/library/nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
