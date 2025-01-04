# OneLink - Personal Portfolio

This project demonstrates a custom link system and routes powered by React + TypeScript. It includes admin settings, authentication, and a public view.

## Key Features

- Routing with `react-router`, separating Home, Auth, and Admin areas.
- Modular architecture with specialized layouts (`MainLayout`, `AdminLayout`).
- React Query integration for data fetching and validation.
- Ready-to-use scripts for development, build, and production.

## Backend Highlights

- Node.js + Express + TypeScript with JWT authentication and link management.
- Profile APIs, CRUD operations for links, and user search by handle.
- Security via JWT middleware, rate limiting, CORS configuration, and data validation using Zod.
- Auto-generated API documentation with Swagger.

## Local Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18+
- **npm**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamcristian/onelink.git
   cd onelink/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Other scripts (see `package.json`):
   - `npm run build`: Builds the project for production.
   - `npm run preview`: Runs the local server with the production build.
   - `npm run dev:share`: Serves the application accessible on your local network.

## Route Structure

- "/" (MainLayout) → `Home`
- "/auth" (MainLayout) → `Login`, `Register`
- "/admin" (AdminLayout) → `Links`, `Profile`
- "/:handle" (MainLayout) → `Handle`
- "/404" → `NotFound`

## Technologies

- **React + TypeScript** - Main frontend stack.
- **React Query** - Data fetching and caching.
- **React Router** - Routing and navigation.
- **React Hook Form** - Form validation and submission.
- **zod** - Data validation for forms and API responses.
- **Tailwind CSS** - Utility-first CSS framework.
- **Shadcn** - CSS-in-JS library for styling.
- **Axios** - HTTP client for API requests.
- **Storybook** - Component development and documentation.
- **dnd-kit** - Drag and drop interactions.
- **vite** - Next-generation frontend tooling.

## Docker Setup

1. Build the Docker image:

   ```bash
   docker-compose build frontend
   ```

2. Start the frontend container:

   ```bash
   docker-compose up -d frontend
   ```

3. Access the frontend at [http://localhost:5173](http://localhost:5173).
