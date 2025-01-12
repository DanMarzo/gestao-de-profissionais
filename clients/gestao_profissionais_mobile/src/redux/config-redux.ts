import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {especialidadeReducer} from './stores/especialidade/especialidade.store';
import {useDispatch} from 'react-redux';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga/'
import rootSaga from './sagas';

//Sim eu sei, usar Context API teria sido mt melhor, mais facil, iria diminuir muito trabalho
//Mas fazia mt tempo que nao usava redux e para praticar optei por usar ele

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  especialidade: especialidadeReducer,
});

const store = configureStore({
  reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      //.concat(logger)
      .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export {store, reducers, useAppDispatch};
