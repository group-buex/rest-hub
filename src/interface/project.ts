export interface IProject {
  _id: string;
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

export interface IProjectMember {
  seq: number;
  userId: string;
  role: string;
}

export interface IProjectApi {
  _id: string;
  seq: number;
  order: number;
  projectId: string;
  title: string;
  description: string;
  list: {
    _id: string;
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
      _id: string;
      seq: number;
      order: number;
      code: number;
      message: string;
      data: object;
    }[];
  }[];
  models: {
    _id: string;
    seq: number;
    order: number;
    name: string;
    model: object;
  }[];
}
