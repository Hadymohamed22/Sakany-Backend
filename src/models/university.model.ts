import { pool } from "../db";
import { University } from "../types/models";

export async function findAllUniversities(): Promise<University[]> {
  const result = await pool.query<University>(
    "SELECT * FROM university ORDER BY name",
  );
  return result.rows;
}
