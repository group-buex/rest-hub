import type { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../../server/middleware/mongodb";

import { CatchType } from "typings";
import { postProject } from "../../../../server/controller/project";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  try {
    const id = req.query.id as string[];

    if (id.length === 1) {
      const router = id[0];

      if (req.method === "GET") {
        if (router === "list") {
          // return await getProject(req,res)
        }
        // if (req.method === "GET" && req.query.id.length === 1) {
        //   return await getProjectListByAdmin(req, res);
        // }
        // if (req.method === "GET" && req.query.id.length === 2) {
        //   return await getApiListByProjectId(req, res);
        // }
      }
      if (req.method === "POST") {
        if (router === "new") {
          return await postProject(req, res);
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
