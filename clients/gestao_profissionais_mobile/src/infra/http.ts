import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosInstance} from 'axios';

let url = null;

const getHttp = async (): Promise<AxiosInstance> => {
  url ??= await AsyncStorage.getItem('client_http');
  if (!url) throw new Error('Não foi possível obter URL Client');

  const http = axios.create({
    baseURL: url,
    timeout: 15000,
  });
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
  return http;
};

export {getHttp};
