import {createSelector} from '@reduxjs/toolkit';
import {State} from '../../../types';
import {EspecialidadeState} from './especialidade.state';

const especialidade = (state: State) => state.especialidade;

const especialidadeSelector = createSelector(
  especialidade,
  (feature: EspecialidadeState) => feature.especialidades,
);

export {especialidadeSelector};
