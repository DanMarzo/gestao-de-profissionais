import axios from 'axios';
import {ProfissionalModel} from '../../models/profissional.model';
import {http} from '../http';
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
    const response = await http.get('/api/Profissional', {
      params,
    });
    return new ResponseListDTO<ProfissionalModel>(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export {obterProfissionaisService};
