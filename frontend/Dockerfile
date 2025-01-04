# Use the official Node.js image based on Alpine Linux
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install the project dependencies
RUN npm install

# Install the 'serve' package globally
RUN npm install -g serve

# Copy the rest of the application code to the working directory
COPY . .

# Build the project
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application using 'serve'
CMD ["serve", "-s", "dist"]