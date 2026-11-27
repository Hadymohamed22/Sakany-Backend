import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { LoginBody, RegisterBody } from "../types/auth";

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

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as LoginBody;

    const { token, user_id, email, role, name } = await loginUser(
      body.email,
      body.password,
    );

    res.status(200).json({
      token,
      user: {
        user_id,
        name,
        email,
        role,
      },
    });
  } catch (err) {
    next(err);
  }
}
