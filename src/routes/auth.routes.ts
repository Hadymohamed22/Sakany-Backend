import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { validate } from "../middleware/validate.middleware";

const router = Router();

// Register User
router.post("/register", validate(registerSchema), register);

// Login User
router.post("/login", validate(loginSchema), login);

export default router;
