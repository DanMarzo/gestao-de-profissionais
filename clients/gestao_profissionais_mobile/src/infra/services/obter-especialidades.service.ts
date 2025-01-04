import { EspecialidadeModel } from "../../models/especialidade.model";
import { http } from "../http";
import { ResponseAPIDTO } from "./response/response.api.dto";

const obterEspecialidadesService = async (): Promise<
  ResponseAPIDTO<Array<EspecialidadeModel>>
> => {
  const response = await http.get("api/Especialidade");
  return new ResponseAPIDTO<Array<EspecialidadeModel>>(response);
};
export { obterEspecialidadesService };
