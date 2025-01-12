import {EspecialidadeState} from './stores/especialidade/especialidade.store';
import {ObterProfissionaisState} from './stores/profissional/obter-profissionais.store';

interface State {
  especialidade: EspecialidadeState;
  obterProfissionais: ObterProfissionaisState;
}

export type {State};
