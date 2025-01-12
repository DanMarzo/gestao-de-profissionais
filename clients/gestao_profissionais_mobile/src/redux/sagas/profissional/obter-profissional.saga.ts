import {call, Effect, put, takeLatest} from 'redux-saga/effects';
import {ResponseListDTO} from '../../../infra/services/response/response-list.dto';
import {ProfissionalModel} from '../../../models/profissional.model';
import {
  obterProfissionaisService,
  ObterProfissionaisServiceProps,
} from '../../../infra/services/profissionais/obter-profissionais.service';
import {
  getProfissionaisAction,
  isErrorGetProfissionaisAction,
  isSuccessGetProfissionaisAction,
} from '../../stores/profissional/obter-profissionais.store';
import {PayloadAction} from '@reduxjs/toolkit';

function* profissionaisRequestSaga(
  action: PayloadAction<ObterProfissionaisServiceProps | undefined>,
): Generator<Effect, void, ResponseListDTO<ProfissionalModel>> {
  const response = yield call(() => obterProfissionaisService(action.payload));

  if (!response.error) {
    console.log(JSON.stringify(response, null, 2));
    yield put(isSuccessGetProfissionaisAction(response));
    return;
  }
  yield put(isErrorGetProfissionaisAction('--->'));
  return;
}

export function* mainRequestProfissionaisSaga() {
  yield takeLatest(getProfissionaisAction, profissionaisRequestSaga);
}
