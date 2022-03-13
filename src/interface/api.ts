export interface IApi extends IApiList {
  _id: string;
  seq: number;
  projectId: string;
  title: string;
  description: string;
  list: IApiList[];
  models: {
    seq: number;
    name: string;
    model: object;
  }[];
}

export interface IApiList {
  _id: string;
  seq: number;
  method: string;
  url: string;
  description: string;
  notice: string;
  mockData: object;
  request: IApiRequest[];
  response: IApiResponse[];
}

export interface IApiRequest {
  _id: string;
  seq: number;
  name: string;
  type: string;
  description: string;
}

export interface IApiResponse {
  _id: string;
  seq: number;
  code: number;
  message: string;
  data: object;
}
