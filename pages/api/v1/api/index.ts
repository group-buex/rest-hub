import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../server/middleware/mongodb";
import IApi from "../../../../server/interface/api";

import { CatchType } from "typings";
import { postApi } from "../../../../server/controller/api";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IApi[] | CatchType>
) => {
  if (req.method === "POST") return await postApi(req, res);
};

export default connectDB(handler);
