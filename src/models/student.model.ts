import { PoolClient } from "pg";
import { CreateStudentData } from "../types/models";

export async function createStudent(
  client: PoolClient,
  data: CreateStudentData,
): Promise<void> {
  await client.query(
    "INSERT INTO student (student_id, college_id, original_government) VALUES ($1, $2, $3)",
    [data.user_id, data.college_id, data.government],
  );
}
