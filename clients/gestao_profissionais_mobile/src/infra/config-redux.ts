import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {especialidadeReducer} from '../shared/state/especialidade/especialidade.state';
import {State} from '../types';
import {useDispatch} from 'react-redux';

//Sim eu sei, usar Context API teria sido mt melhor, mais facil, iria diminuir muito trabalho
//Mas fazia mt tempo que nao usava redux e para praticar optei por usar ele

const reducers = combineReducers({
  especialidade: especialidadeReducer,
});

const store = configureStore<State>({
  middleware: undefined,
  reducer: reducers,
});

const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export {store, reducers, useAppDispatch};
