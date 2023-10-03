export interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  loggedInAt?: Date;
  isBlocked: boolean;
}