import { IProject } from "interface/project";
import { Document } from "mongoose";

export default interface IUser extends Document {
  _id: string;
  seq: number;
  name: string;
  email: string;
  hash_password?: string;
  salt?: string;
  type: string;
  accessToken: string;
  refreshToken: string;
  project?: IProject[];
  createdAt: Date;
  updatedAt: Date;
}
