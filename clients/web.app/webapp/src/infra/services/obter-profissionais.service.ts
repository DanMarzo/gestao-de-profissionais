import { ProfissionalModel } from "../../models/profissional.model";
import { http } from "../http";
import { ResponseListDTO } from "./response/response-list.dto";

const obterProfissionaisService = async (
  pagina: number,
  especialidadeId?: number
): Promise<ResponseListDTO<ProfissionalModel>> => {
  //api/Profissional?pagina=1&itens=1
  //Caso sobre tempo, incluir o numero de itens que é opcional
  const response = await http.get("api/Profissional", {
    params: {
      pagina,
      especialidadeId,
    },
  });
  return new ResponseListDTO<ProfissionalModel>(response);
};
export { obterProfissionaisService };
