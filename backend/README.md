# Onelink - Backend

Onelink is a backend designed as a **Linktree clone**, providing users with a robust and flexible API to create and manage multiple links on a single personalized page. This project is built with **Node.js**, **Express**, and **TypeScript**, following best practices for modern API development.

---

## Features

- **User Management:**

  - Registration and authentication with JWT.
  - Profile update and customization.
  - Support for profile image uploads.

- **Link Management:**

  - CRUD functionality for personalized links.
  - User search and filtering by unique handle.

- **Security and Optimization:**

  - Authentication middleware using JWT.
  - Protection against attacks with rate-limiting and configured CORS.
  - Data validation with **Zod**.

- **Documentation:**
  - Automatically generated API documentation with **Swagger**.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** v18+
- **npm**
- **MongoDB** (local or cloud, e.g., Atlas)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iamcristian/onelink-backend.git
   cd onelink-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set environment variables:**
   Create a `.env` file in the root directory and fill the `.env.template` file with your own values:
   ```env
   PORT=4000
   MONGO_URI=mongodb://root:mongo@mongo:27017/onelink?authSource=admin
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Starts the server in production mode.
- **`npm run dev`**: Starts the server in development mode.
- **`npm run dev:api`**: Starts the server in development mode with CORS enabled for Postman.
- **`npm run build`**: Compiles the TypeScript code to JavaScript.

## API Documentation

The API documentation is available at `/api-docs` once the server is running.

1. **Start the server:**

   ```bash
   npm run dev
   ```

2. **Open the browser and navigate to:**
   ```bash
   http://localhost:4000/api-docs
   ```

## Technologies Used

- **Node.js** - JavaScript runtime environment.
- **Express** - Web framework for Node.js.
- **TypeScript** - Typed superset of JavaScript.
- **MongoDB** - NoSQL database.
- **Mongoose** - MongoDB object modeling for Node.js.
- **JWT** - JSON Web Token for authentication.
- **Zod** - Data validation library.
- **Swagger** - API documentation tool.
- **Cloudinary** - Image and video management API.
- **Argon2** - Password hashing algorithm.

## Docker Setup

1. Build the Docker image:

   ```bash
   docker-compose build backend
   ```

2. Start the backend container:

   ```bash
   docker-compose up -d backend
   ```

3. Access the backend at [http://localhost:4000](http://localhost:4000).
