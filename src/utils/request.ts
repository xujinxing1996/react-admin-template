import axios, { Method, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  timeout: 6000,
});

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((config) => {
  return config.data;
});

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  const prefix = '';
  url = prefix + url;
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, { params: data, ...config });
  }
};
