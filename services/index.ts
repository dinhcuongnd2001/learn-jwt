import { refreshTokenFn } from "@/common";
import { axiosPublic } from "@/configs/axios/axios.public";
import { TypeGenTokenPair, TypeLogin } from "@/interfaces";

export const handleLogin = async ({
  username,
  password,
}: TypeLogin): Promise<boolean> => {
  try {
    const { accessToken, refreshToken } = await axiosPublic.post<
      never,
      TypeGenTokenPair
    >("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    return true;
  } catch (error) {
    return false;
  }
};
