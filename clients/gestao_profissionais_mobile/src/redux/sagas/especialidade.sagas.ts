import {call, Effect, put, takeLatest} from 'redux-saga/effects';
import {obterEspecialidadesService} from '../../infra/services/especialidades/obter-especialidades.service';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {ResponseAPIDTO} from '../../infra/services/response/response.api.dto';
import {
  getEspecialidadesAction,
  isErrorEspecialidadesAction,
  isSuccessEspecialidadesAction,
} from '../../shared/state/especialidade/especialidade.state';

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
