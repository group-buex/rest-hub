import { Document } from "mongoose";

export default interface IApi extends Document {
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
    request: {
      seq: number;
      order: number;
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
    mock: object;
  }[];
  models: {
    seq: number;
    order: number;
    name: string;
    model: object;
  }[];
}
