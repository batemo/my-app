export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserDocument extends User, Document {}

export type UserQuery = Partial<Pick<User, 'id' | 'email' | 'role'>>;

export type UserResult = Omit<User, 'passwordHash'>; 