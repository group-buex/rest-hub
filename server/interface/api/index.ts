import { Document } from "mongoose";

export default interface IApi extends Document {
  seq: number;
  projectId: string;
  title: string;
  description: string;
  list: {
    method: string;
    url: string;
    description: string;
    request: {
      seq: number;
      name: string;
      type: string;
      description: string;
    }[];
    response: {
      seq: number;
      code: number;
      message: string;
      data: object;
    }[];
    mock: object;
  };
  models: {
    seq: number;
    name: string;
    model: object;
  }[];
}
