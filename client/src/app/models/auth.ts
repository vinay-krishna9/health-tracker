export interface User {
  email: string;
  name: string;
  password: string;
}

export type LoginRequest = Pick<User, 'email' | 'password'>;
export type RegistrationRequest = User;
