import {EspecialidadeModel} from '../../../models/especialidade.model';
import {getHttp} from '../../http';
import {ResponseAPIDTO} from '../response/response.api.dto';

const obterEspecialidadesService = async (): Promise<
  ResponseAPIDTO<Array<EspecialidadeModel>>
> => {
  const http = await getHttp();
  const response = await http.get('api/Especialidade');
  return new ResponseAPIDTO<Array<EspecialidadeModel>>(response);
};
export {obterEspecialidadesService};
