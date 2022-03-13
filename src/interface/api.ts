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
}
