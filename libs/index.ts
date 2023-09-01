import { TypeGenTokenPair } from "@/interfaces";
import * as jwt from "jsonwebtoken";

const secret = process.env.SECRET_CODE as string;

export const genTokenPair = ({
  username,
}: {
  username: string;
}): TypeGenTokenPair => {
  const accessToken = jwt.sign({ username }, secret, {
    expiresIn: 60,
    // 60 -> 1 phút
  });
  const refreshToken = jwt.sign({ username }, secret, {
    expiresIn: 60 * 60,
    // -> 1h
  });

  return { accessToken, refreshToken };
};

export const verifyToken = ({
  accessToken,
}: {
  accessToken: string;
}): string => {
  try {
    const { username } = jwt.verify(accessToken, secret) as {
      username: string;
    };
    return username;
  } catch (error) {
    return "";
  }
};
