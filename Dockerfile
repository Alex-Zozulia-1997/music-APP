# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy all necessary files
COPY . .

# List contents of /app directory for debugging
RUN ls -al /app

# Build the Vite application
RUN npm run build

# Use a minimal Node.js image to serve the build files
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
