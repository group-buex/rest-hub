import { Document } from "mongoose";

export default interface IProject extends Document {
  seq: number;
  authorId: string;
  title: string;
  description: string;
  baseUrl: string;
  webUrl: string;
  member?: IProjectMember[];
  api?: IProjectApi[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectMember {
  email: string;
  role: string;
}

export interface IProjectApi {
  seq: number;
  order: number;
  projectId: string;
  title: string;
  description: string;
  status: "wait" | "ready" | "published";
  list: {
    seq: number;
    order: number;
    method: string;
    url: string;
    description: string;
    notice: string;
    mockData: object;
    status: "wait" | "ready" | "published";
    request: {
      seq: number;
      order: number;
      isRequired: boolean;
      defaultValue: string;
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
