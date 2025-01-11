import {obterEspecialidadesService} from '../../../infra/services/obter-especialidades.service';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

type EspecialidadeState = {
  especialidades: Array<EspecialidadeModel>;
  carregando: boolean;
};
const initialState: EspecialidadeState = {
  especialidades: [],
  carregando: false,
};
// const getEspecialidadesAction = createAsyncThunk(
//   'getEspecialidadesAction',
//   async () => {
//     const response = await obterEspecialidadesService();
//     return response.data;
//   },
// );

const especialidade = createSlice({
  name: 'especialidade',
  initialState,
  reducers: {
    getEspecialidadesAction: (state) => {
      state.carregando = true;
    },
    getEspecialidadesIsSuccessAction: (state, action: PayloadAction<any>) => {
      state.especialidades = action.payload;
      state.carregando = false;
    },
  },
});

export const {getEspecialidadesAction, getEspecialidadesIsSuccessAction} = especialidade.actions;
export const especialidadeReducer = especialidade.reducer;
export type {EspecialidadeState};
