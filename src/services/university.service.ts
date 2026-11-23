import { findAllUniversities } from "../models/university.model";

export async function getUniversitiesService() {
  return findAllUniversities();
}
