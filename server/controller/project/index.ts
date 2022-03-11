import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";
import { mongo } from "mongoose";

import IProject from "../../interface/project";
import Projects from "../../model/project";

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
