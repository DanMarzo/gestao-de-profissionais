import {obterEspecialidadesService} from '../../../infra/services/obter-especialidades.service';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

type EspecialidadeState = {
  especialidades: Array<EspecialidadeModel>;
  carregando: boolean;
};
const initialState: EspecialidadeState = {
  especialidades: [],
  carregando: false,
};
const getEspecialidadesAction = createAsyncThunk(
  'getEspecialidadesAction',
  async () => {
    const response = await obterEspecialidadesService();
    return response.data;
  },
);

const especialidade = createSlice({
  name: 'especialidade',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getEspecialidadesAction.fulfilled, (state, action) => {
      const lista = action?.payload;
      state.especialidades = lista ?? [];
      state.carregando = false;
    }),
      builder.addCase(getEspecialidadesAction.pending, (state, action) => {
        state.carregando = true;
      }),
      builder.addDefaultCase((state, action) => {
        state.carregando = false;
      });
  },
});

export const {actions: especialidadeActions, reducer: especialidadeReducer} =
  especialidade;
export {getEspecialidadesAction};
export type {EspecialidadeState};
