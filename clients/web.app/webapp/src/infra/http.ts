import axios, { AxiosError } from "axios";

let baseURL = (window as any).API_CONFIG.apiUrl;
if (!baseURL) {
  baseURL = import.meta.env.VITE_URL_API;
}

const http = axios.create({ baseURL, timeout: 15000 });
http.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    if (error instanceof AxiosError) {
      //Em caso de erro do tipo axios, faca a tratativa para nao cair no catch
      return Promise.resolve(error);
    }
    return Promise.reject(error);
  }
);

export { http };
