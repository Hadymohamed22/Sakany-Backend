import { Router } from "express";
import universityRoutes from "./university.routes";

const router = Router();

router.use("/universities", universityRoutes);

export default router;
