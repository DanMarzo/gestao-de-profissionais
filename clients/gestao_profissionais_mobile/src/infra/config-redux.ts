import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {especialidadeReducer} from '../shared/state/especialidade/especialidade.state';
import { State } from '../types';

//Sim eu sei, usar Context API teria sido mt melhor, mais facil, iria diminuir muito trabalho
//Mas fazia mt tempo que nao usava redux e para praticar optei por usar ele

const reducers = combineReducers({
  especialidade: especialidadeReducer,
});

const store = configureStore<State>({
  middleware: undefined,
  reducer: reducers,
});

export {store, reducers};
