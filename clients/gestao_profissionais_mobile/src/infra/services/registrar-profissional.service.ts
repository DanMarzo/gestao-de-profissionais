import { RegistrarProfissionalDTO } from "../../models/profissional.model";
import { getHttp } from "../http";
import { ResponseToCreate } from "./response/response-to-create.dto";
import { ResponseAPIDTO } from "./response/response.api.dto";

const registrarProfissionalService = async (
  values: RegistrarProfissionalDTO
): Promise<ResponseAPIDTO<ResponseToCreate<string>>> => {
  const response = await (await getHttp()).post("/api/Profissional", values);
  return new ResponseAPIDTO<ResponseToCreate<string>>(response);
};
export { registrarProfissionalService };
