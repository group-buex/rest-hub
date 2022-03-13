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
      const data = req.body as IApi;

      data.list.forEach((item, index: number) => {
        item.seq = index;
        item.order = index;

        item.request.forEach((request, index: number) => {
          request.seq = index;
          request.order = index;
          return request;
        });

        item.response.forEach((response, index: number) => {
          response.seq = index;
          response.order = index;
          return response;
        });

        return item;
      });

      data.models.forEach((item, index: number) => {
        item.seq = index;
        item.order = index;
        return item;
      });

      const newApis: IApi[] = await new Apis(data).save();
      return res.status(200).json(newApis);
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
