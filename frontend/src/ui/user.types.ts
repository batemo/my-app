export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export type UserResult = Omit<User, 'passwordHash'>; 