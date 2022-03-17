export default interface IUser {
  _id: string;
  seq: number;
  name: string;
  email: string;
  type: string;
  accessToken: string;
  refreshToken: string;
  project?: IUserProject[];
  shared?: IUserProject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserProject {
  _id: string;
  seq: number;
  role: string;
  projectId: string;
  title: string;
  description: string;
  updatedAt: Date;
}
