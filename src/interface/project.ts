export interface IProject {
  _id: string;
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
  status: "wait" | "ready" | "published";
  list: {
    _id: string;
    seq: number;
    order: number;
    method: string;
    url: string;
    description: string;
    notice: string;
    mockData: object;
    request: IProjectApiRequest[];
    response: IProjectApiResponse[];
  }[];
  models: IProjectApiModels[];
}

export interface IProjectApiRequest {
  seq: number;
  order: number;
  isRequired: boolean;
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}
export interface IProjectApiResponse {
  seq: number;
  order: number;
  code: number;
  message: string;
  data: object;
}

export interface IProjectApiModels {
  seq: number;
  order: number;
  name: string;
  model: object;
}
