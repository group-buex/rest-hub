import crypto from "crypto";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import IUser from "../interface/user";

export const setDecode = (
  password: string,
  hash_password: string,
  salt: string
) => {
  return (
    crypto
      .createHmac(process.env.NEXT_PUBLIC_CRYPTO_ALGORITHM, salt)
      .update(password)
      .digest("hex") === hash_password
  );
};

export const verifyJwt = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const token = await extractAccessToken(req);

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized.", status: 401 });
  }
  return token.toString() as string;
};

export const generateToken = (data: IUser) => {
  return jwt.sign(
    {
      user: {
        _id: data._id,
        name: data.name,
        email: data.email,
        type: data.type,
      },
    },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 1,
    }
  );
};

export const generateRefreshToken = (data: IUser) => {
  return jwt.sign(
    {
      user: {
        _id: data._id,
        name: data.name,
        email: data.email,
        type: data.type,
        t: "r",
      },
    },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 14,
    }
  );
};

// jwt decode
export const decodeJwt = async (token: string) => {
  return jwt.verify(
    String(token),
    process.env.NEXT_PUBLIC_JWT_SECRET,
    function (err: any, decoded: any) {
      if (err) return { status: 500, result: err };
      if (decoded.user !== undefined) {
        return { status: 200, result: decoded };
      }
    }
  );
};

export const extractAccessToken = (req: NextApiRequest) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.toString().split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.toString().split(" ")[1];
  }
};

export const getUserIdByToken = async (token: string) => {
  const {
    result: { user },
  } = await decodeJwt(token);
  return user._id as string;
};
