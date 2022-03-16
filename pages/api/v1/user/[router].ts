import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Cookie from "js-cookie";

import connectDB from "../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import { login, postUser, checkAuth } from "../../../../server/controller/user";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CatchType>
) => {
  try {
    const router: string = req.query.router.toString() as string;
    if (req.method === "GET") {
      if (router === "check-auth") {
        return await checkAuth(req, res);
      }
    }
    if (req.method === "POST") {
      if (router === "") {
        return await postUser(req, res);
      }
      if (router === "login") {
        return await login(req, res);
      }
      if (router === "logout") {
        await Cookie.remove("user_session");
        axios.defaults.headers.common["accessToken"] = null;
        return await login(req, res);
      }
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export default connectDB(handler);
