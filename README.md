# **Onelink - MERN Monorepo**

Onelink is a full-stack **MERN** application designed to offer a personalized link-in-bio system (similar to **Linktree**). It features profile customization, link sorting, and real-time visual analytics.

This project is organized as a modern **pnpm monorepo workspace**, bundling a frontend React SPA and a backend Express TypeScript API service under a unified structure.

### Home
<img width="1920" height="958" alt="{D28C3EE8-17FA-4CFA-8DB1-E339493D096E}" src="https://github.com/user-attachments/assets/b5e3ae51-0fe1-4820-9524-3ec01e2bea9b" />

### Link editor
<img width="1445" height="957" alt="{FCEB236C-D52B-4997-AB03-F0F67C834851}" src="https://github.com/user-attachments/assets/68f918e7-646e-4fba-8eca-0a03ccc519d0" />

### Edit Profile
<img width="1425" height="954" alt="{CFB4A913-D356-425B-BE0C-2E33E9FC7AAC}" src="https://github.com/user-attachments/assets/683d3f1c-e112-4aa3-a333-88d33c0716a9" />

### Analytics
<img width="1388" height="958" alt="{E618EDEA-FDB1-4AF1-A046-75A7B2CF5792}" src="https://github.com/user-attachments/assets/79813413-7e56-4cab-a5bf-3b6a0fa3bc81" />

### Link
<img width="1205" height="956" alt="{4BB1B3E9-54A2-4A0F-B1F6-4D7ABDE28008}" src="https://github.com/user-attachments/assets/b2b7c0f6-d900-4637-a468-f898f469cd5b" />

---

## **Key Features**

### **Frontend (Vite + React + TS)**
*   **Keystroke-Optimized Forms**: Uses React Hook Form with performant validation, completely avoiding render-lag on typing.
*   **Dynamic Theme Picker**: Customize your public profile page's design. Includes premium styles:
    *   *Midnight Sky*: Glassmorphic components over dark blue gradients.
    *   *Sunset Rose*: Soft pastel pink-orange styling.
    *   *Neo-Brutalism*: Flat bold layouts with heavy solid shadows.
    *   *Minimalist*: Clean, high-contrast dark/light outline aesthetics.
*   **Visual Analytics Dashboard**: Real-time link clicks tracking using **Recharts** bar graphs.
*   **Advanced Interactions**: Drag-and-drop link sorting using `@dnd-kit`.
*   **Standard Theme Injection**: Standard dark/light mode switching powered by `next-themes`.

### **Backend (Node.js + Express + TS)**
*   **Robust Async Middleware**: Global Express error handler utilizing an `asyncHandler` wrapper to securely capture database exceptions.
*   **REST API Standard**: Standardized endpoints grouped logically under `/api` (`/api/auth/*` and `/api/user/*`).
*   **TypeScript Native Engine**: Dev servers run typescript files natively inside Node 24 (`tsx`), providing instant startup times.
*   **Mongoose Subdocuments**: Stores user links inside a typed array of subdocuments in MongoDB for optimal query performance.
*   **Cloud Image Uploads**: Integrates with Cloudinary for avatar uploads.

---

## **Prerequisites**

*   **Node.js** v22+ / v24+
*   **pnpm** v10+ (Install globally via `npm i -g pnpm` or enable via `corepack enable`)
*   **MongoDB** (Local or cloud)
*   **Docker** (Optional, for running MongoDB locally)

---

## **Local Installation & Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/iamcristian/onelink.git
cd onelink
```

### **2. Setup Environment Variables**

Create a `.env` file inside the `backend` folder based on `backend/.env.template`:
```env
PORT=4000
MONGO_URI=mongodb://root:mongo@localhost:27017/onelink?authSource=admin
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` file inside the `frontend` folder:
```env
VITE_API_URL=http://localhost:4000
```

### **3. Install Workspace Dependencies**
Install all dependencies for both frontend and backend using `pnpm` from the root directory:
```bash
pnpm install
```

### **4. Start Local MongoDB Database**
If you have Docker, start the MongoDB container in the background:
```bash
docker-compose up -d mongo
```

### **5. Run Development Servers**
Start both frontend and backend development servers concurrently with a single command from the root:
```bash
pnpm dev
```
*   **Frontend**: Access at [http://localhost:5173](http://localhost:5173)
*   **Backend / API Docs**: View Swagger interactive docs at [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

---

## **Monorepo Workspace Commands**

Run these commands from the root directory:

*   `pnpm dev`: Start both frontend and backend development servers concurrently.
*   `pnpm build`: Run TypeScript compiler (`tsc`) on backend and bundle production build for frontend.
*   `pnpm --filter onelink-frontend <cmd>`: Run a script specifically inside the frontend workspace.
*   `pnpm --filter onelink-backend <cmd>`: Run a script specifically inside the backend workspace.

---

## **Production Deployment**

Refer to [deploy_config.md](file:///c:/Users/crisa/Workspace/onelink/deploy_config.md) for the complete, step-by-step production deployment instructions for **MongoDB Atlas**, **Render**, and **Vercel**.
