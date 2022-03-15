import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import { checkAuth } from "../../../../server/controller/user";
import IUser from "interface/user";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser | CatchType>
) => {
  if (req.method === "POST") return await checkAuth(req, res);
};

export default connectDB(handler);
