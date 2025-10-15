# --- Build Stage ---
FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev
COPY . .

# Ensure vite binary is executable
RUN chmod +x ./node_modules/.bin/vite

# Run vite build directly
RUN node ./node_modules/vite/bin/vite.js build

# --- Runtime Stage ---
FROM public.ecr.aws/docker/library/nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
