# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the app using a simple static server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]

# Expose the port the app runs on
EXPOSE 3000
