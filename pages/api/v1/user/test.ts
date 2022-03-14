import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import { test } from "../../../../server/controller/user";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") return await test(req, res);
};

export default connectDB(handler);
