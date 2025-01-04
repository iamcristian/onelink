import { Router } from "express";
import { createAccount, login, verifyToken } from "../handlers/auth";
import { validateSchema } from "../middleware/validateSchema";
import { loginUserSchema, registerUserSchema } from "../schemas/userSchema";

const routerAuth = Router();

/**
 * @swagger
 * /api/auth/health:
 * get:
 * summary: Health check
 */
routerAuth.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timeStamp: new Date() });
});

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Register user
 * description: Register user
 * requestBody:
 * required: true
 * content:
 * application/json:
 */
routerAuth.post(
  "/auth/register",
  validateSchema(registerUserSchema),
  createAccount
);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Login user
 * description: Login user
 * requestBody:
 * required: true
 * content:
 * application/json:
 */
routerAuth.post("/auth/login", validateSchema(loginUserSchema), login);

/**
 * @swagger
 * /api/auth/verify-token:
 * get:
 * summary: Verify token
 * description: Verify token
 */
routerAuth.get("/auth/verify-token", verifyToken);

export default routerAuth;
