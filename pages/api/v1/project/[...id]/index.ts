import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../../server/middleware/mongodb";
import IProject from "../../../../../server/interface/project";

import { CatchType } from "typings";
import {
  getProjectListByAdmin,
  getApiListByProject,
} from "../../../../../server/controller/project";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Array<IProject> | CatchType>
) => {
  if (req.method === "GET" && req.query.id.length === 1) {
    return await getProjectListByAdmin(req, res);
  }
  if (req.method === "GET" && req.query.id.length === 2) {
    return await getApiListByProject(req, res);
  }
};

export default connectDB(handler);
