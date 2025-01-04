import slug from "slug";
import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJWT, verifyJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: "Email already exists" });
    return;
  }

  // Check if handle already exists
  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }

  // Create user
  const user = new User(req.body);
  user.handle = handle;
  user.password = await hashPassword(password);

  await user.save();

  res.status(201).send({ message: "User created" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Check if password is correct
  const isPasswordCorrect = await checkPassword(user.password, password);

  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  // Generate token
  const token = generateJWT({ id: user._id });

  res.status(200).json({ token, user: { email: user.email } });
};

// verify token
export const verifyToken = (req: Request, res: Response) => { 
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(400).json({ message: "Token is required" });
    return;
  }

  const decoded = verifyJWT(token);

  if (!decoded) {
    res.status(400).json({ message: "Invalid or expired token" });
    return;
  }

  res.status(200).json({message: "Token is valid", userId: decoded.id});
}