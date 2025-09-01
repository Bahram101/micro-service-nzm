export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  iin?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
