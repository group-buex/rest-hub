import crypto from "crypto";
import jwt from "jsonwebtoken";
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
      expiresIn: 60 * 60 * 24 * 14,
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
