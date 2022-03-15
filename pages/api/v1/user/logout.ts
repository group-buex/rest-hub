import type { NextApiRequest, NextApiResponse } from "next";
import Cookie from "js-cookie";
import axios from "actions/axios";

import connectDB from "../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import { login } from "../../../../server/controller/user";
import IUser from "interface/user";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser | CatchType>
) => {
  if (req.method === "POST") {
    await Cookie.remove("user_session");
    await Cookie.remove("user_session_rf");
    axios.defaults.headers.common["accessToken"] = null;
    return await login(req, res);
  }
};

export default connectDB(handler);
