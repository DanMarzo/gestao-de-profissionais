import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {especialidadeReducer} from '../shared/state/especialidade/especialidade.state';
import { State } from '../types';

const reducers = combineReducers({
  especialidade: especialidadeReducer,
});

const store = configureStore<State>({
  middleware: undefined,
  reducer: reducers,
});

export {store, reducers};
