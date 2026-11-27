export type AuthUser = {
  user_id: string;
  role: "student" | "owner";
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
