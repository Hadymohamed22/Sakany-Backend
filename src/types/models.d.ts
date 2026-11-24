export interface User {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  gender: "male" | "female";
  phone?: string;
  role: "student" | "owner";
}

export type CreateUserData = Omit<User, "user_id">;

export interface CreateStudentData {
  user_id: string;
  college_id: string;
  government: string;
}

export interface CreateOwnerData {
  user_id: string;
  owner_address?: string;
}

export interface University {
  university_id: string;
  name: string;
  latitude: number;
  longitude: number;
}
