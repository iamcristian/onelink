# Use Node.js 22 Alpine
FROM node:22-alpine

# Install pnpm using corepack
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install --no-frozen-lockfile

# Install 'serve' package globally using pnpm
RUN pnpm add -g serve

# Copy the rest of the frontend files
COPY . .

# Build the project
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Command to run
CMD ["serve", "-s", "dist"]