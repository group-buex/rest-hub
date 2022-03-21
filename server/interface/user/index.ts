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
  project?: IUserProject[]; // 본인이 소유한 프로젝트
  shared?: IUserProject[]; // 공유된 프로젝트
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProject {
  _id: string;
  authorEmail?: string;
  authorId?: string;
  role: string;
  projectId: string;
  title: string;
  createdAt: Date;
}
