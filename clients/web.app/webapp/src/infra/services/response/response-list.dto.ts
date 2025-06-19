import { AxiosResponse } from "axios";

class ResponseListDTO<T> {
  constructor(response: AxiosResponse) {
    if (response.status >= 200 && response.status < 300) {
      Object.assign(this, response.data);
    } else this.error = true;
  }
  qtde: number;
  nroPaginas: number;
  totalItens: number;
  indice: number;
  data: Array<T> = [];
  error: boolean = false;
}
export { ResponseListDTO };
