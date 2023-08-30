import axios, {
  AxiosError,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshTokenFn } from "@/common";

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  sent?: boolean;
}

const axiosProtected = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @param : config: this is the all config will passed with request
 *
 */

axiosProtected.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // before send req
    // we will get accessToken from localhost and bind it into header;

    const accessToken = JSON.parse(String(localStorage.getItem("accessToken")));
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosProtected.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err: AxiosError) => {
    // config đại diện cho cấu hình của yêu cầu ban đầu đã gây ra lỗi
    const config = err.config as CustomAxiosConfig;

    if (err.response?.status === 401 && !config.sent) {
      // kiểm tra xem req gây lỗi này đã được gửi chưa, nếu chưa được gửi thì sẽ gửi => tránh việc gửi lại liên tục
      config.sent = true;
      const { accessToken } = await refreshTokenFn();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        } as AxiosRequestHeaders;
      }
      return axios(config);
    }
    return Promise.reject(err);
  }
);

export { axiosProtected };
