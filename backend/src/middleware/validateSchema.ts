import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

interface ValidateSchema {
  (schema: ZodSchema): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export const validateSchema: ValidateSchema =
  (schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: "Errors in validation", errors: error.errors });
      }
    }
  };
