import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the request has the Authorization header
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Check if the token is in the correct format
  const token = bearer.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Check if the token is valid
  try {
    // decoded is the payload of the token e.g. {id, iat, exp}
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("-password -__v");
      if (!user) {
        res.status(404).json({ message: "Unauthorized" });
        return;
      }
      req.user = user;
      next();
    }
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
    else res.status(500).json({ message: "An unknown error occurred" });
  }
};
