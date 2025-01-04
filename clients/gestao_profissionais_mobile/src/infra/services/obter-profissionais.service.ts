import {ProfissionalModel} from '../../models/profissional.model';
import { getHttp } from '../http';
import {ResponseListDTO} from './response/response-list.dto';

const obterProfissionaisService = async (
  pagina: number,
  especialidadeId?: number,
): Promise<ResponseListDTO<ProfissionalModel>> => {
  const params = {
    pagina,
    especialidadeId,
  };
  //api/Profissional?pagina=1&itens=1
  //Caso sobre tempo, incluir o numero de itens que é opcional
  try {
    const response = await (await getHttp()).get('/api/Profissional', {
      params,
    });
    console.log(response)
    return new ResponseListDTO<ProfissionalModel>(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export {obterProfissionaisService};
