import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { registerSchema } from "../validators/auth.schema";
import { validate } from "../middleware/validate.middleware";

const router = Router();

// Register User
router.post("/register", validate(registerSchema), register);

export default router;
