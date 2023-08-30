import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPublic.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    console.log("error", err);
    console.log("error", typeof err);

    return Promise.reject(err);
  }
);

export { axiosPublic };
