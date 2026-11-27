import { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import { validate } from "../middleware/validate.middleware";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Register User
router.post("/register", validate(registerSchema), register);

// Login User
router.post("/login", validate(loginSchema), login);

// Me
router.get("/me", authenticate, me);

export default router;
