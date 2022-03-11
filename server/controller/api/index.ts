import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";
import { mongo } from "mongoose";

import IApi from "../../interface/api";
import Apis from "../../model/api";

import { CatchType } from "typings";

/***
 * Post Add New Api
 * @METHOD `POST`
 * @PATH `/api/v1/api`
 */
export const postApi = async (
  req: NextApiRequest,
  res: NextApiResponse<IApi[] | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const newApis: IApi[] = await new Apis(req.body).save();
      return res.status(200).json(newApis);
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
