import { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/auth.service";
import { RegisterBody } from "../validators/auth.schema";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = req.body as RegisterBody;

    const { user_id, token } = await registerUser(body);

    res.status(201).json({
      token,
      user: {
        user_id,
        name: body.name,
        email: body.email,
        role: body.role,
      },
    });
  } catch (err) {
    next(err);
  }
}
