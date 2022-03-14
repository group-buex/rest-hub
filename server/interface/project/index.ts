import { Document } from "mongoose";

export default interface IProject extends Document {
  seq: number;
  name: string;
  title: string;
  description: string;
  baseUrl: string;
  admin: string;
  webUrl: string;
  member?: IMember[];
}

interface IMember {
  seq: number;
  userId: string;
  role: string;
}
