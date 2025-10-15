# ---- Build Stage ----
FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev
COPY . .

RUN chmod -R 755 /app/node_modules

# Run Vite build directly via Node to avoid Alpine permission traps
RUN node ./node_modules/vite/bin/vite.js build

# ---- Runtime Stage ----
FROM public.ecr.aws/docker/library/nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


