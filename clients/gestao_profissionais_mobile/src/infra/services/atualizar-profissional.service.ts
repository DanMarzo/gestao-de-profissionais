import { ProfissionalModel } from "../../models/profissional.model";
import { http } from "../http";
import { ResponseAPIDTO } from "./response/response.api.dto";

const atualizarProfissionalService = async (
  idProfissional: number,
  values: any
): Promise<ResponseAPIDTO<ProfissionalModel>> => {
  const response = await http.put(
    `/api/Profissional/${idProfissional}`,
    values
  );
  return new ResponseAPIDTO<ProfissionalModel>(response);
};
export { atualizarProfissionalService };
