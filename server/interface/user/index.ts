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
  project?: IProject[]; // 본인이 소유한 프로젝트
  shared?: IProject[]; // 공유된 프로젝트
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: string;
  seq: number;
  projectId: string;
  role: string;
}
