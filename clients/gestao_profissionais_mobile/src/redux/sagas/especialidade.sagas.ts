import {call, Effect, put, takeLatest} from 'redux-saga/effects';
import {obterEspecialidadesService} from '../../infra/services/obter-especialidades.service';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {ResponseAPIDTO} from '../../infra/services/response/response.api.dto';
import {
  getEspecialidadesAction,
  getEspecialidadesIsSuccessAction,
} from '../../shared/state/especialidade/especialidade.state';

function* especialidadesRequestSaga(): Generator<
  Effect,
  void,
  ResponseAPIDTO<Array<EspecialidadeModel>>
> {
  const response = yield call(obterEspecialidadesService);
  if (!response.error) {
    yield put(getEspecialidadesIsSuccessAction(response.data));
    return;
  }
}
export function* mainEspecialidadesSaga() {
  yield takeLatest(getEspecialidadesAction, especialidadesRequestSaga);
}
