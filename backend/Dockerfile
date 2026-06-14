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

# Copy the rest of the backend files
COPY . .

# Compile TypeScript
RUN pnpm run build

# Expose port 4000
EXPOSE 4000

# Command to run
CMD ["node", "dist/index.js"]
