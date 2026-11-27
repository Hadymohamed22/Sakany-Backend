import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { LoginBody, RegisterBody } from "../types/auth";
import { findUserById } from "../models/user.model";
import { AppError } from "../utils/app-error.util";

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

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await findUserById(req.user!.user_id);
    if (!user) throw new AppError(404, "User not found");

    res.status(200).json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
}
