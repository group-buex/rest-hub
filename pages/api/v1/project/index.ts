import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../server/middleware/mongodb";
import IProject from "../../../../server/interface/project";

import { CatchType } from "typings";
import { postProject } from "../../../../server/controller/project";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProject[] | CatchType>
) => {
  if (req.method === "POST") return await postProject(req, res);
};

export default connectDB(handler);
