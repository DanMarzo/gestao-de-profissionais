import {all} from 'redux-saga/effects';
import {mainEspecialidadesSaga} from './especialidade/especialidade.sagas';
import {mainRequestProfissionaisSaga} from './profissional/obter-profissional.saga';

export default function* rootSaga() {
  yield all([mainRequestProfissionaisSaga()]);
}
