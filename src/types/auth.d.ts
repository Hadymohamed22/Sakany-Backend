import z from "zod";
import { loginSchema, registerSchema } from "../validators/auth.schema";

export type RegisterBody = z.infer<typeof registerSchema>;

export type LoginBody = z.infer<typeof loginSchema>;
