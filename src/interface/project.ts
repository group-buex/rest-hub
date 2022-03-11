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
