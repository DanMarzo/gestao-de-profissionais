import {EspecialidadeModel} from '../../../models/especialidade.model';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type EspecialidadeState = {
  especialidades: Array<EspecialidadeModel>;
};
const initialState: EspecialidadeState = {
  especialidades: []
};
const especialidade = createSlice({
  name: 'especialidade',
  initialState,
  reducers: {
    setEspecialidades: (state, action: PayloadAction<Array<EspecialidadeModel>>) => {
        state.especialidades = action.payload;
    },
  },
});

export const { actions: especialidadeActions, reducer: especialidadeReducer } = especialidade;
export type {EspecialidadeState};
