import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "./../utils/app-error.util";
import { pool } from "../db";
import { createUser, findUserByEmail } from "../models/user.model";
import { createStudent } from "../models/student.model";
import { createOwner } from "../models/owner.model";
import { DatabaseError } from "pg";

type BaseUser = {
  name: string;
  email: string;
  gender: "male" | "female";
  phone?: string;
};
type RoleData =
  | { role: "student"; college_id: string; original_government: string }
  | { role: "owner"; owner_address?: string };

type RegisterInput = BaseUser & { password: string } & RoleData;
type TxInput = BaseUser & { password_hash: string } & RoleData;

export async function registerTransaction(data: TxInput): Promise<string> {
  const { email, name, password_hash, gender, phone, role } = data;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user_id = await createUser(client, {
      email,
      name,
      gender,
      password_hash,
      phone,
      role,
    });

    if (data.role === "student") {
      await createStudent(client, {
        user_id,
        college_id: data.college_id,
        government: data.original_government,
      });
    } else {
      await createOwner(client, { user_id, owner_address: data.owner_address });
    }

    await client.query("COMMIT");
    return user_id;
  } catch (err) {
    await client.query("ROLLBACK");
    if (err instanceof DatabaseError && err.code === "23505") {
      throw new AppError(409, "Email already registered");
    }
    throw err;
  } finally {
    client.release();
  }
}

export async function registerUser(
  data: RegisterInput,
): Promise<{ user_id: string; token: string }> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const existing = await findUserByEmail(data.email);
  if (existing) throw new AppError(409, "Email already registered");

  const { password, ...rest } = data;
  const password_hash = await bcrypt.hash(password, 10);

  const user_id = await registerTransaction({ ...rest, password_hash });

  const token = jwt.sign({ user_id, role: data.role }, jwtSecret, {
    expiresIn: "12h",
  });

  return { user_id, token };
}
