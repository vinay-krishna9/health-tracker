export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export type LoginRequest = Pick<User, 'email' | 'password'>;
export type RegistrationRequest = Pick<User, 'email' | 'name' | 'password'>;
export type AuthResponse = Pick<User, 'email' | 'name'>;
