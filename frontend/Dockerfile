FROM public.ecr.aws/docker/library/node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

# Ensure executables and permissions
RUN chmod -R 755 node_modules/.bin

# Run build as root via npx (fixes vite permission issue)
RUN npx vite build

# Serve static files with Nginx
FROM public.ecr.aws/docker/library/nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
