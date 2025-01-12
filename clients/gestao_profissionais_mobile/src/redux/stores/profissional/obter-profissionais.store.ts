import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProfissionalModel} from '../../../models/profissional.model';
import {ResponseListDTO} from '../../../infra/services/response/response-list.dto';
import {ObterProfissionaisServiceProps} from '../../../infra/services/profissionais/obter-profissionais.service';

type ObterProfissionaisState = {
  profissionais: Array<ProfissionalModel>;
  carregando: boolean;
  messageErrorGetProfissionais: string;
  numeroPaginas?: number;
  totalItens: number;
  indice: number;
};

const initialState: ObterProfissionaisState = {
  carregando: false,
  indice: 1,
  numeroPaginas: undefined,
  profissionais: [],
  totalItens: 10,
  messageErrorGetProfissionais: '',
};

const obterProfissionaisSlice = createSlice({
  name: 'obterProfissionaisSlice',
  initialState,
  reducers: {
    getProfissionaisAction: (
      state,
      action: PayloadAction<ObterProfissionaisServiceProps | undefined>,
    ) => {
      state.carregando = true;
    },
    isErrorGetProfissionaisAction: (state, action: PayloadAction<string>) => {
      state.messageErrorGetProfissionais = action.payload;
      state.carregando = false;
      state.profissionais = [];
      state.indice = 1;
      state.numeroPaginas = 1;
      state.totalItens = 0;
    },
    isSuccessGetProfissionaisAction: (
      state,
      action: PayloadAction<ResponseListDTO<ProfissionalModel>>,
    ) => {
      state.carregando = false;
      const {data, indice, nroPaginas, qtde, totalItens} = action.payload;
      state.profissionais = data;
      state.indice = indice;
      state.numeroPaginas = nroPaginas;
      state.totalItens = qtde;
      state.totalItens = totalItens;
    },
  },
});

export const {
  isErrorGetProfissionaisAction,
  isSuccessGetProfissionaisAction,
  getProfissionaisAction,
} = obterProfissionaisSlice.actions;
export const obterProfissionaisReducer = obterProfissionaisSlice.reducer;
export type {ObterProfissionaisState};
