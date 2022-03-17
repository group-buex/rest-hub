import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Cookie from "js-cookie";

import connectDB from "../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import {
  login,
  postUser,
  checkAuth,
  postUserProject,
} from "../../../../server/controller/user";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  try {
    const id = req.query.id as string[];

    if (id.length === 1) {
      const router = id[0];

      if (req.method === "GET") {
        if (router === "check-auth") {
          return await checkAuth(req, res);
        }
      }
      if (req.method === "POST") {
        if (router === "project") {
          return await postUserProject(req, res);
        }
        if (router === "login") {
          return await login(req, res);
        }
        if (router === "sign-up") {
          return await postUser(req, res);
        }
        if (router === "logout") {
          await Cookie.remove("user_session");
          axios.defaults.headers.common["authorization"] = null;
          return await login(req, res);
        }
      }
      return null;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
};

export default connectDB(handler);
