import jwt from "jsonwebtoken";

export function generateJWT(user_id: string, user_role: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const token = jwt.sign({ user_id, role: user_role }, jwtSecret, {
    expiresIn: "12h",
  });

  return token;
}
