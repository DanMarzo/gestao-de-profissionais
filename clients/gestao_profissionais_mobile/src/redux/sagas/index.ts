import { all } from "redux-saga/effects";
import { mainEspecialidadesSaga } from "./especialidade.sagas";

export default function* rootSaga() {
  yield all([mainEspecialidadesSaga]);
}
