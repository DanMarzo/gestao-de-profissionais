import axios, {AxiosError} from 'axios';

const http = axios.create({baseURL: 'http://192.168.1.2:5123', timeout: 15000});
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
  },
);

export {http};
