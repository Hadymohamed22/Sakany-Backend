import { pool } from "../db";
import { CreateUserData, User } from "../types/models";
import { PoolClient } from "pg";

// Get User By Email
export async function findUserByEmail(
  email: string,
): Promise<User | undefined> {
  const result = await pool.query<User>(
    "SELECT user_id, name, email, password_hash, gender, phone, role FROM app_user WHERE email = $1",
    [email],
  );
  return result.rows[0];
}

// Create User
export async function createUser(
  client: PoolClient,
  data: CreateUserData,
): Promise<string> {
  const result = await client.query<{ user_id: string }>(
    `INSERT INTO app_user (name, email, password_hash, gender, phone, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING user_id`,
    [
      data.name,
      data.email,
      data.password_hash,
      data.gender,
      data.phone ?? null,
      data.role,
    ],
  );

  return result.rows[0].user_id;
}
