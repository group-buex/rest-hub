import { decodeJwt } from "./../../helper/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";
import { mongo } from "mongoose";

import IProject from "../../interface/project";
import IUser from "../../interface/user";
import IApi from "../../interface/api";
import Projects from "../../model/project";
import Users from "../../model/user";
import Apis from "../../model/api";

import { CatchType } from "typings";
import { getUserIdByToken, verifyJwt } from "../../helper";

/***
 * Post Add New Project
 * @METHOD `POST`
 * @PATH `/api/v1/project`
 */
export const postProject = async (
  req: NextApiRequest,
  res: NextApiResponse<IProject[] | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      // const user = await getUserByToken(token);
      // const newProject: IProject[] = await new Projects(req.body).save();

      // if (newProject) {
      //   // await Users.findByIdAndUpdate({_id})
      //   return res.status(200).json(newProject);
      // }
      return res
        .status(500)
        .json({ msg: "Can not Create a project. Try again" });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * GET Project List
 * @METHOD `GET`
 * @PATH `/api/v1/project/list`
 */
export const getProject = async (
  req: NextApiRequest,
  res: NextApiResponse<IProject[] | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);

  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const token: string = (await verifyJwt(req, res)) as string;
      const decoded = await getUserIdByToken(token);
      if (token) {
        console.log(decoded);
        // const newProject: IProject[] = await new Projects(req.body).save();
      }

      //   if (!admin) {
      //     return res.status(401).json({
      //       msg: "Unauthorized.",
      //     });
      //   }
      //   await Projects.find({ admin })
      //     .sort({ createdAt: -1 })
      //     .exec(async (err: Object, inquery: IProject[]) => {
      //       if (err) {
      //         return res.status(400).json({ msg: JSON.stringify(err) });
      //       }
      //       return res.status(200).json(inquery);
      //     });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};

/***
 * get Project Item By Id
 * @METHOD `GET`
 * @PATH `/api/v1/project/:admin/:id`
 */
export const getApiListByProjectId = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const token: string = (await verifyJwt(req, res)) as string;
      const userId: string = (await getUserIdByToken(token)) as string;
      if (token) {
        // const newProject: IProject[] = await new Projects(req.body).save();
        console.log(userId);
      }

      // const {
      //   id: [, _id],
      // } = req.query as { id: string[] };

      // await Projects.findById({ _id }).exec(
      //   async (err: Object, project: IProject) => {
      //     if (err || !project) {
      //       return res.status(404).json({
      //         msg: "Can not found project",
      //       });
      //     }

      //     await Apis.find({ projectId: _id }).exec(
      //       (err: Object, api: IApi[]) => {
      //         if (err || !api) {
      //           return res.status(404).json({
      //             msg: "Can not found api list",
      //           });
      //         }
      //         return res.status(200).json({ project, api });
      //       }
      //     );
      //   }
      // );
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
