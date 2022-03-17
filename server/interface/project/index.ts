import { Document } from "mongoose";

export default interface IProject extends Document {
  seq: number;
  authorId: string;
  title: string;
  description: string;
  baseUrl: string;
  webUrl: string;
  member?: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

interface IMember {
  seq: number;
  userId: string;
  role: string;
}
