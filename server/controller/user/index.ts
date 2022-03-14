import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";

import IUser from "../../interface/user";
import Users from "../../model/user";

import { CatchType } from "typings";
import {
  generateRefreshToken,
  generateToken,
  setDecode,
  verifyJwt,
} from "../../helper";

const checkAuth = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const token = await verifyJwt(req, res);
    await Users.findOne({ accessToken: token }).exec(
      async (err: Object, user: IUser) => {}
    );
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      error,
    });
  }
};

export const test = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      await verifyJwt(req, res);

      console.log("through");
      res.json(200);
      // await Users.findOne({ email: req.body.email }).exec(
      //   async (err: Object, user: IUser) => {
      //     if (user) {
      //       return res.status(500).json({
      //         msg: "Email is already exist.",
      //       });
      //     }
      //     if (!user) {
      //       const newUser = Object.assign(req.body);

      //       newUser.accessToken = await generateToken(req.body);
      //       newUser.refreshToken = await generateRefreshToken(req.body);

      //       await new Users(newUser).save();
      //       return res.status(200).json({ msg: "done", error: null });
      //     }
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

/***
 * Post Add New User
 * @METHOD `POST`
 * @PATH `/api/v1/user`
 */
export const postUser = async (
  req: NextApiRequest,
  res: NextApiResponse<CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      await Users.findOne({ email: req.body.email }).exec(
        async (err: Object, user: IUser) => {
          if (user) {
            return res.status(500).json({
              msg: "Email is already exist.",
            });
          }
          if (!user) {
            const newUser = Object.assign(req.body);

            newUser.accessToken = await generateToken(req.body);
            newUser.refreshToken = await generateRefreshToken(req.body);

            await new Users(newUser).save();
            return res.status(200).json({ msg: "done", error: null });
          }
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

/***
 * login
 * @METHOD `GET`
 * @PATH `/api/v1/user/login`
 */
export const login = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email) {
        return res.status(400).json({
          msg: "Please enter 'Email' Field",
        });
      }

      if (!password) {
        return res.status(400).json({
          msg: "Please enter 'Password' Field",
        });
      }

      // check verify
      await Users.findOne({ email }).exec(async (err: Object, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            msg: "Can not found user",
          });
        }

        const match = await setDecode(password, user.hash_password, user.salt);

        // check password
        if (!match) {
          return res.status(400).json({
            msg: "Please check you password.",
          });
        }

        // update refresh token
        await Users.findByIdAndUpdate(
          { _id: user._id },
          {
            accessToken: await generateToken(req.body),
            refreshToken: await generateRefreshToken(req.body),
          }
        ).exec(async (err: Object, user: IUser) => {
          if (err || !user) {
            return res.status(404).json({
              msg: "Can not found user",
            });
          }

          const {
            _id,
            name,
            email,
            type,
            accessToken,
            refreshToken,
            project,
            seq,
            createdAt,
            updatedAt,
          } = user;

          return res.status(200).json(
            Object.assign({
              _id,
              seq,
              name,
              email,
              type,
              accessToken,
              refreshToken,
              project,
              createdAt,
              updatedAt,
            }) as IUser
          );
        });
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
