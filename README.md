# **Onelink - A Full-Stack Personal Portfolio Platform**
Onelink is a full-stack **MERN** application designed to offer a personalized link system similar to **Linktree**, with management, authentication, and public viewing functionalities. This project integrates a frontend developed with **React + TypeScript** and a robust backend with **Node.js + Express**.

## Main View
![{BA558601-7DB4-459E-945C-7C9853628D57}](https://github.com/user-attachments/assets/4b86d415-5b99-4b9c-bf83-2e50951e903f)
## Light and Dark Mode
![{1055BB1B-84A4-49DE-910A-C464A03FCC66}](https://github.com/user-attachments/assets/eef35759-a2f3-41e8-ad9a-d470d2bf188e)
![{C3260D29-9D40-47F6-90FD-1199C882800D}](https://github.com/user-attachments/assets/6722f806-a84b-4fb5-8612-d340aadff043)
## Search by username and verify if it's available
![{B58D9BC5-FD6F-4C55-9271-90A47DF6AC6B}](https://github.com/user-attachments/assets/0857abcb-6b1a-40ba-84bf-60419c7033fe)
## Add Social Network Links and Custom with Drag and Drop
![{06259EB5-A126-4B31-9477-A9DD4F776163}](https://github.com/user-attachments/assets/2280565e-89be-438a-9b8a-f82df03e7037)
## Link Available for all users with the link
![{772B6684-E29A-4A68-803B-A82D8BEE239A}](https://github.com/user-attachments/assets/6f2bbf6e-d55d-45e1-979e-63000f569a4b)

---

## **Main Features**
### **Frontend**
- **Dynamic routing system** with `react-router` and custom layouts.
- **Data validation** and form handling with React Query, Zod, and React Hook Form.
- **Modern styling** with Tailwind CSS and Shadcn.
- **Advanced interactions** like Drag-and-Drop using dnd-kit.
### **Backend**
- **Secure JWT authentication** with middleware.
- **APIs for profiles and links**, including CRUD operations.
- **API documentation** automatically generated with Swagger.
- **Security and validation** with CORS, Zod, and rate limiters.
- **Image management** using the Cloudinary API.
---
## **Technologies Used**
### **Frontend**
- React + TypeScript
- Vite (for fast development and build)
- Tailwind CSS + Shadcn
- React Query and Axios
- Storybook
- dnd-kit
- Zod
### **Backend**
- Node.js + TypeScript
- Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Swagger
- Argon2
- Zod
- Cloudinary API
### **Infrastructure and Tools**
- Docker and Docker Compose
- Git
---
## **Prerequisites**
Before starting, make sure you have the following installed on your machine:
- **Node.js** (v22 or higher)
- **npm**
- **MongoDB** (local or cloud, like Atlas)
- **Git**
- **Docker** and **Docker Compose**
---
## **Local Installation**
### **1. Clone the repository**
```bash
git clone https://github.com/iamcristian/onelink.git
cd onelink
```
### **2. Configure the Frontend**
1. Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Create a `.env` file based on the example file:
  ```bash
  cp .env.example .env
  ```
4. Set the `VITE_API_URL` variable with your backend URL:
  ```env
  VITE_API_URL=http://localhost:4000
  ```
### **3. Configure the Backend**
1. Navigate to the backend directory:
  ```bash
  cd ../backend
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3. Create a `.env` file based on the example file:
  ```bash
  cp .env.example .env
  ```
4. Set the following variables in the `.env` file:
  ```env
  PORT=4000
  MONGO_URI=mongodb://root:mongo@mongo:27017/onelink?authSource=admin
  FRONTEND_URL=http://localhost:5173
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_NAME=your_cloudinary_name
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  ```
### **4. Start the Application**
- **Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```
  Access [http://localhost:5173](http://localhost:5173).
- **Backend**:
  ```bash
  cd backend
  npm run dev
  ```
  Access [http://localhost:4000](http://localhost:4000).
---
## **Project Structure**
```plaintext
onelink/
├── frontend/          # Client code
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Server code
│   ├── src/
│   └── package.json
├── docker-compose.yml # Docker configuration
├── README.md          # Main documentation
└── LICENSE            # Project license
```
