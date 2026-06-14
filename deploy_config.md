# OneLink Deployment Guide

This guide provides step-by-step instructions to deploy the OneLink application to production for free using **MongoDB Atlas**, **Render**, and **Vercel**.

---

## 1. Database Setup: MongoDB Atlas (Free M0 Cluster)

MongoDB Atlas offers a permanent free tier that is perfect for hosting the database.

1.  **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up.
2.  **Create a New Cluster**:
    *   Choose the **M0 Free** shared tier.
    *   Select your preferred cloud provider (e.g., AWS) and region.
    *   Click **Create Cluster**.
3.  **Configure Database Access**:
    *   Go to **Database Access** under Security.
    *   Click **Add New Database User**.
    *   Set a username and password (keep these safe). Set user privileges to `Read and write to any database`.
4.  **Configure Network Access**:
    *   Go to **Network Access** under Security.
    *   Click **Add IP Address**.
    *   Select **Allow Access from Anywhere** (adds `0.0.0.0/0`). *Note: This is required because Render's free tier web services do not have static IP addresses.*
5.  **Get the Connection URI**:
    *   Go to **Database** under Deployment.
    *   Click **Connect** next to your cluster.
    *   Choose **Drivers** as the connection method.
    *   Copy the connection string (it looks like `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`).
    *   Replace `<username>` and `<password>` with your database user credentials. Keep this URI ready as `MONGO_URI`.

---

## 2. Backend Deployment: Render (Web Service)

Render is a cloud provider that allows hosting Express/Node applications for free.

1.  **Create a Render Account**: Go to [Render](https://render.com/) and sign up. Connect your GitHub account.
2.  **Create a Web Service**:
    *   Click **New** ➔ **Web Service**.
    *   Select your OneLink repository.
3.  **Configure Service Details**:
    *   **Name**: `onelink-backend` (or your choice).
    *   **Runtime**: `Node`.
    *   **Root Directory**: `backend` (very important: this isolates the backend build context).
    *   **Build Command**: `pnpm install --no-frozen-lockfile && pnpm build` (Render will build the compiled JS files using TS).
    *   **Start Command**: `node dist/index.js`.
    *   **Instance Type**: **Free**.
4.  **Configure Environment Variables**:
    *   Click on the **Environment** tab.
    *   Add the following variables:
        *   `PORT`: `10000` (or leave default, Render sets this automatically).
        *   `MONGO_URI`: *Your MongoDB Atlas connection URI*.
        *   `JWT_SECRET`: *A secure random string of your choice*.
        *   `CLOUDINARY_NAME`: *Your Cloudinary cloud name*.
        *   `CLOUDINARY_API_KEY`: *Your Cloudinary API key*.
        *   `CLOUDINARY_API_SECRET`: *Your Cloudinary API secret*.
        *   `FRONTEND_URL`: *The URL of your frontend (e.g., https://your-onelink.vercel.app - you can update this after deploying the frontend)*.
5.  **Deploy**: Click **Create Web Service**. Wait for the build logs to show `Server is running` and copy the backend URL (looks like `https://onelink-backend.onrender.com`).

---

## 3. Frontend Deployment: Vercel (Static Web Hosting)

Vercel is the optimal platform to deploy frontend React applications.

1.  **Create a Vercel Account**: Go to [Vercel](https://vercel.com/) and log in using GitHub.
2.  **Import Project**:
    *   Click **Add New...** ➔ **Project**.
    *   Import your OneLink repository.
3.  **Configure Build & Development Settings**:
    *   **Framework Preset**: `Vite` (Vercel auto-detects this).
    *   **Root Directory**: `frontend` (very important: this isolates the frontend build context).
    *   **Build Command**: `vite build` (leaves default).
    *   **Output Directory**: `dist` (leaves default).
4.  **Configure Environment Variables**:
    *   Expand the **Environment Variables** section.
    *   Add:
        *   `VITE_API_URL`: *The URL of your Render backend (e.g. `https://onelink-backend.onrender.com` - do not include a trailing slash)*.
5.  **Deploy**: Click **Deploy**. Vercel will build and deploy the React bundle, and provide you with your live URL (e.g., `https://onelink.vercel.app`).

---

## 4. Final Verification
*   Go back to your **Render Web Service** dashboard, open environment variables, and verify that `FRONTEND_URL` is updated with your Vercel URL (e.g., `https://onelink.vercel.app`).
*   Open your Vercel URL in the browser, register a new account, upload a profile picture, configure your links, and verify that everything functions correctly!
