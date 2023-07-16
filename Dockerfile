# Stage 1: Build Angular application
FROM node:16 as builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular app to the container
COPY . .

# Build the Angular application
RUN npm run build

## Stage 2: Serve the Angular app using Nginx
FROM nginx:latest AS proxy

## Copy the built Angular app from the previous stage to Nginx's default public directory
COPY --from=builder /app/dist/ /usr/share/nginx/html
#
## Expose the Nginx port (default is 80)
EXPOSE 80

