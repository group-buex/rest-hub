import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import {
  getProjectById,
  postProject,
} from "../../../../../server/controller/project";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  try {
    return await getProjectById(req, res);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB(handler);
