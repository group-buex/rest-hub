import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";
import { mongo } from "mongoose";

import IProject from "../../interface/project";
import IApi from "../../interface/api";
import Projects from "../../model/project";
import Apis from "../../model/api";

import { CatchType } from "typings";

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
      const newProject: IProject[] = await new Projects(req.body).save();
      return res.status(200).json(newProject);
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
 * @PATH `/api/v1/project/:admin`
 */
export const getProjectListByAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse<IProject[] | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);

  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    const {
      id: [admin],
    } = req.query as { id: string[] };

    try {
      if (!admin) {
        return res.status(401).json({
          msg: "Unauthorized.",
        });
      }

      await Projects.find({ admin })
        .sort({ createdAt: -1 })
        .exec(async (err: Object, inquery: IProject[]) => {
          if (err) {
            return res.status(400).json({ msg: JSON.stringify(err) });
          }
          return res.status(200).json(inquery);
        });
    } catch (error) {
      res.status(500).json({
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
export const getApiListByProject = async (
  req: NextApiRequest,
  res: NextApiResponse<any | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const {
        id: [, _id],
      } = req.query as { id: string[] };

      await Projects.findById({ _id }).exec(
        async (err: Object, project: IProject) => {
          if (err || !project) {
            return res.status(404).json({
              msg: "Can not found project",
            });
          }

          await Apis.find({ projectId: _id }).exec(
            (err: Object, api: IApi[]) => {
              if (err || !api) {
                return res.status(404).json({
                  msg: "Can not found api list",
                });
              }
              return res.status(200).json({ project, api });
            }
          );
        }
      );
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
