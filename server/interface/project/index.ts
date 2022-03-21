import { Document } from "mongoose";

export default interface IProject extends Document {
  seq: number;
  authorId: string;
  title: string;
  description: string;
  baseUrl: string;
  webUrl: string;
  member?: IProjectMember[];
  api?: IProjectApi;
  createdAt: Date;
  updatedAt: Date;
}

interface IProjectMember {
  userId: string;
  role: string;
}

interface IProjectApi {
  seq: number;
  order: number;
  projectId: string;
  title: string;
  description: string;
  list: {
    seq: number;
    order: number;
    method: string;
    url: string;
    description: string;
    notice: string;
    mockData: object;
    request: {
      seq: number;
      order: number;
      isRequired: boolean;
      name: string;
      type: string;
      description: string;
    }[];
    response: {
      seq: number;
      order: number;
      code: number;
      message: string;
      data: object;
    }[];
  }[];
  models: {
    seq: number;
    order: number;
    name: string;
    model: object;
  }[];
}
