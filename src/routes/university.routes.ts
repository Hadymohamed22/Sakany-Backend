import { Router } from "express";
import { getAllUniversities } from "../controllers/university.controller";

const router = Router();

// GET /universities
router.get("/", getAllUniversities);

export default router;
