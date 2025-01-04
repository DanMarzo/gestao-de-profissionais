import { AxiosResponse } from "axios";

class ResponseAPIDTO<TResponse> {
  constructor(response: AxiosResponse) {
    this.data = response.data ?? null;
    this.error = !(response.status >= 200 && response.status < 300);
  }
  error: boolean;
  data: TResponse | null;
}
export { ResponseAPIDTO };
