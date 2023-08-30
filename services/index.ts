import { axiosProtected } from "@/configs/axios/axios.protected";
import { axiosPublic } from "@/configs/axios/axios.public";
import { TypeGenTokenPair, TypeLogin, TypeResponse } from "@/interfaces";

interface TypeLoginResponse extends Pick<TypeResponse, "message"> {
  data: TypeGenTokenPair;
}

export const handleLogin = async ({
  username,
  password,
}: TypeLogin): Promise<boolean> => {
  try {
    const {
      data: { accessToken, refreshToken },
    } = await axiosPublic.post<never, TypeLoginResponse>("/auth/login", {
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

export const handleGetDataDefault = async (): Promise<string> => {
  try {
    const { message } = await axiosPublic.post<never, TypeResponse>(
      "/auth/default"
    );
    return message;
  } catch (error) {
    return "";
  }
};

export const handleGetDataProtected = async (): Promise<string> => {
  try {
    const { message } = await axiosProtected.post<never, TypeResponse>(
      "/auth/protected"
    );
    return message;
  } catch (error) {
    return "";
  }
};
