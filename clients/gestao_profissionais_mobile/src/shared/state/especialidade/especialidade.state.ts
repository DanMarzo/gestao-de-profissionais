import {EspecialidadeModel} from '../../../models/especialidade.model';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type EspecialidadeState = {
  especialidades: Array<EspecialidadeModel>;
  carregando: boolean;
  messageErrorGetEspecialidades: string;
};

const initialState: EspecialidadeState = {
  especialidades: [],
  carregando: false,
  messageErrorGetEspecialidades: '',
};

const especialidade = createSlice({
  name: 'especialidade',
  initialState,
  reducers: {
    getEspecialidadesAction: state => {
      state.carregando = true;
    },
    isSuccessEspecialidadesAction: (
      state,
      action: PayloadAction<Array<EspecialidadeModel>>,
    ) => {
      state.especialidades = action.payload;
      state.carregando = false;
    },
    isErrorEspecialidadesAction: (state, action: PayloadAction<string>) => {
      state.messageErrorGetEspecialidades = action.payload;
      state.carregando = false;
      state.especialidades = [];
    },
  },
});

export const {getEspecialidadesAction, isSuccessEspecialidadesAction, isErrorEspecialidadesAction} =
  especialidade.actions;
export const especialidadeReducer = especialidade.reducer;
export type {EspecialidadeState};
