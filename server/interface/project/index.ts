import { Document } from "mongoose";

export default interface IProject extends Document {
  seq: number;
  name: string;
  title: string;
  description: string;
  baseUrl: string;
  adminName: string;
  webUrl: string;
}
