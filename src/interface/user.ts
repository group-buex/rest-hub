import { IProject } from "./project";

export default interface IUser {
  _id: string;
  seq: number;
  name: string;
  email: string;
  type: string;
  accessToken: string;
  refreshToken: string;
  project?: IProject[];
  createdAt: Date;
  updatedAt: Date;
}
