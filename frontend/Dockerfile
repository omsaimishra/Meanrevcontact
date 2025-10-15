FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .

RUN chmod -R 755 node_modules/.bin && chown -R node:node /app

USER node
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

