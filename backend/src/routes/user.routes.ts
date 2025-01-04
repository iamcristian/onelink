import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  getUser,
  getUserByHandle,
  searchByHandle,
  updateProfile,
  uploadImage,
} from "../handlers/profile";
import { validateSchema } from "../middleware/validateSchema";
import { searchByHandleSchema, updateUserSchema } from "../schemas/userSchema";

const router = Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user with authentication JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved user
 */
router.get("/user", authenticate, getUser);

/**
 * @swagger
 * /api/user:
 *   patch:
 *     summary: Update user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Handle already exists
 *       500:
 *         description: Server error while updating profile
 */
router.patch(
  "/user",
  validateSchema(updateUserSchema),
  authenticate,
  updateProfile
);

/**
 * @swagger
 * /api/user/image:
 *   post:
 *     summary: Upload user image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *     responses:
 *       200:
 *         description: User image uploaded successfully
 *       500:
 *         description: Server error while uploading image
 */
router.post("/user/image", authenticate, uploadImage);

/**
 * @swagger
 * /api/user/{handle}:
 *   get:
 *     summary: Get user by handle
 *     parameters:
 *       - in: path
 *         name: handle
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully retrieved user by handle
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error while fetching user by handle
 */
router.get("/user/:handle", getUserByHandle);

/**
 * @swagger
 * /api/user/search:
 *   post:
 *     summary: Search user by handle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Successfully searched user by handle
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error during search
 */
router.post(
  "/user/search",
  validateSchema(searchByHandleSchema),
  searchByHandle
);

export default router;
