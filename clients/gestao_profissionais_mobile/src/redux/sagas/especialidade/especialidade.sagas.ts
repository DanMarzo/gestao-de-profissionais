import {call, Effect, put, takeLatest} from 'redux-saga/effects';
import { ResponseAPIDTO } from '../../../infra/services/response/response.api.dto';
import { EspecialidadeModel } from '../../../models/especialidade.model';
import { obterEspecialidadesService } from '../../../infra/services/especialidades/obter-especialidades.service';
import { getEspecialidadesAction, isErrorEspecialidadesAction, isSuccessEspecialidadesAction } from '../../stores/especialidade/especialidade.store';

function* especialidadesRequestSaga(): Generator<
  Effect,
  void,
  ResponseAPIDTO<Array<EspecialidadeModel>>
> {
  const response = yield call(obterEspecialidadesService);
  if (!response.error) {
    yield put(isSuccessEspecialidadesAction(response.data ?? []));
    return;
  }
  yield put(isErrorEspecialidadesAction("Não foi possivel especialidades"));
}

export function* mainEspecialidadesSaga() {
  yield takeLatest(getEspecialidadesAction, especialidadesRequestSaga);
}
