import { Request, Response, NextFunction } from "express";
import { getUniversitiesService } from "../services/university.service";

export async function getAllUniversities(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await getUniversitiesService();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
