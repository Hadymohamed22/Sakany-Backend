import { Router } from "express";
import universityRoutes from "./university.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/universities", universityRoutes);

export default router;
