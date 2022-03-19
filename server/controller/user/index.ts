import type { NextApiRequest, NextApiResponse } from "next";
import { Result, ValidationError, validationResult } from "express-validator";

import IUser from "../../interface/user";
import Users from "../../model/user";

import { CatchType } from "typings";
import {
  decodeJwt,
  generateRefreshToken,
  generateToken,
  setDecode,
  verifyJwt,
} from "../../helper";

/***
 * check jwt token
 * @METHOD `POST`
 * @PATH `/api/v1/user/check-auth`
 */
export const checkAuth = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser | CatchType>
) => {
  try {
    const token = await verifyJwt(req, res);
    if (token) {
      // TODO: findOneAndUdpate
      await Users.findOne({ refreshToken: token }).exec(
        async (err: Object, user: IUser) => {
          if (!user) {
            return res.status(500).json({
              msg: "Can not find User",
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
            shared,
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
              shared,
              createdAt,
              updatedAt,
            }) as IUser
          );
        }
      );
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      error,
    });
  }
};

// const checkJWTVerity = async (req: NextApiRequest, res: NextApiResponse<any>) => {
export const test = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const token: string = (await verifyJwt(req, res)) as string;

    // check that jwt is verified
    const { status, result } = (await decodeJwt(token)) as {
      status: number;
      result: string;
    };

    if (status === 200) {
      await Users.findOne({ refreshToken: token }).exec(
        async (err: Object, user: IUser) => {
          if (!user) {
            return res.status(500).json({
              msg: "Can not find user.",
            });
          }
          return res.status(200).json(true);
        }
      );
    } else {
      return res.status(500).json({
        msg: "JsonWebTokenError",
        error: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
      error,
    });
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
              msg: "Email already used",
            });
          }
          if (!user) {
            const newUser = Object.assign(req.body);

            newUser.accessToken = await generateToken(req.body);
            newUser.refreshToken = await generateRefreshToken(req.body);

            await new Users(newUser).save();
            return res.status(200).json({ msg: "done", error: null });
          } else {
            return res.status(401).json({ msg: "Email already used" });
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

        const accessToken = await generateToken(user);
        const refreshToken = await generateRefreshToken(user);

        // update refresh token
        await Users.findByIdAndUpdate(
          { _id: user._id },
          {
            accessToken,
            refreshToken,
          },
          { new: true, runValidators: true }
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
            shared,
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
              shared,
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

/***
 * Post Add New Project
 * @METHOD `POST`
 * @PATH `/api/v1/project`
 */
export const postUserProject = async (
  req: NextApiRequest,
  res: NextApiResponse<IUser | CatchType>
) => {
  const errors: Result<ValidationError> = await validationResult(req);
  if (!errors.isEmpty()) {
    const firstError: string = await errors.array().map((err) => err.msg)[0];
    return res.status(422).json({ msg: firstError });
  } else {
    try {
      await Users.findByIdAndUpdate({ _id: "" }, req.body, {
        new: true,
        runValidators: true,
      }).exec(async (err: Object, user: IUser) => {
        if (err || !user) {
          return res.status(404).json({
            msg: "Can not found user",
          });
        }
        return res.status(200).json(user);
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
        error,
      });
    }
  }
};
