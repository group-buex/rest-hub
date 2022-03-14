import { IProject } from "./project";

export default interface IUser {
  _id: string;
  seq: number;
  name: string;
  email: string;
  hash_password: string;
  salt: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  project?: IProject[];
}
