import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error.util";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError(401, "Authentication required"));
  }

  const token = header.split(" ")[1];

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return next(new Error("JWT_SECRET is not defined in .env"));
  }

  try {
    const payload = jwt.verify(token, jwtSecret);

    if (typeof payload === "string") {
      return next(new AppError(401, "Invalid or expired token"));
    }

    req.user = {
      user_id: payload.user_id,
      role: payload.role,
    };

    next();
  } catch {
    return next(new AppError(401, "Invalid or expired token"));
  }
}
