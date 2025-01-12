import {EspecialidadeModel} from '../../../models/especialidade.model';
import {ProfissionalModel} from '../../../models/profissional.model';
import {getHttp} from '../../http';
import {ResponseListDTO} from '../response/response-list.dto';

interface ObterProfissionaisServiceProps {
  especialidade?: EspecialidadeModel;
  pagina: number;
}

const obterProfissionaisService = async (
  parameters?: ObterProfissionaisServiceProps,
): Promise<ResponseListDTO<ProfissionalModel>> => {
  const http = await getHttp();
  const response = await http.get('/api/Profissional', {
    params: parameters && {
      pagina: parameters.pagina,
      especialidadeId: parameters.especialidade?.id,
    },
  });
  return new ResponseListDTO<ProfissionalModel>(response);
};

export type {ObterProfissionaisServiceProps};
export {obterProfissionaisService};
