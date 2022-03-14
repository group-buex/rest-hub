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
    return res.status(400).json({ msg: "Unauthorized.", status: 400 });
  }
  // jwtPayload = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
  return token;
};

export const generateToken = (data: IUser) => {
  return jwt.sign(
    {
      user: {
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
  jwt.verify(
    String(token),
    process.env.NEXT_PUBLIC_JWT_SECRET || "secret",
    function (err: any, decoded: any) {
      if (err) return err;
      if (decoded.user !== undefined) {
        return decoded.user;
      }
    }
  );
};

export const extractAccessToken = (req: NextApiRequest) => {
  if (
    (req.headers.accesstoken &&
      req.headers.accesstoken.toString().split(" ")[0] === "Bearer") ||
    req.cookies.accesstoken
  ) {
    return req.headers.accesstoken.toString().split(" ")[1];
  }
};
