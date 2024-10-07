# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the app for production
RUN npm run build

# Expose the application port (default is 3000 for NestJS apps)
EXPOSE 3000

# Start the app using the production build
CMD ["npm", "run", "start:prod"]
