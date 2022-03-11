export interface IProject {
  _id: string;
  seq: number;
  name: string;
  title: string;
  description: string;
  baseUrl: string;
  admin: string;
  webUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectApi extends IProject {
  _id: string;
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
