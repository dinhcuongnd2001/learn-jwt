import mem from "mem";

import { axiosPublish } from "@/configs/axios/axios.publish";
import { TypeGenTokenPair } from "@/interfaces";
const maxAge = parseInt(process.env.NEXT_PUBLIC_MAX_AGE || "10000");

export const refreshTokenFn = mem(
  async (): Promise<TypeGenTokenPair> => {
    // b1 get refreshtoken from localStorage
    const refreshToken = JSON.parse(
      String(localStorage.getItem("refreshToken"))
    );
    try {
      const newToken = await axiosPublish.post<never, TypeGenTokenPair>(
        "/refresh-token",
        undefined,
        {
          headers: {
            Authorization: `BEARER ${refreshToken}`,
          },
        }
      );
      console.log("new Token ::", newToken);
      if (!newToken) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      }
      localStorage.setItem("accessToken", JSON.stringify(newToken.accessToken));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(newToken.refreshToken)
      );
      return newToken;
    } catch (error) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      return { accessToken: "", refreshToken: "" };
    }
  },
  { maxAge }
);
