import * as yup from 'yup';
import {EspecialidadeModel} from './especialidade.model';

class ProfissionalModel {
  id: number;
  nome: string;
  numeroDocumento: string;
  //Para tratar evitar erros no tratamento de datas, eu recebo como string
  criadoEm: string;
  especialidade: EspecialidadeModel;
}

class RegistrarProfissionalDTO {
  especialidadeId: number;
  nome: string;
  numeroDocumento: string;
}

const formProfissionalSchema = yup.object().shape({
  nome: yup
    .string()
    .required('Nome do profissional é obrigatorio')
    .min(3, 'Minimo 3 caracteres'),
  numeroDocumento: yup
    .string()
    .required('Número do documento é obrigatorio.')
    .min(3, 'Minimo 3 caracteres'),
  especialidadeId: yup.number().required('Especialidade é obrigatório.'),
});

export {ProfissionalModel, formProfissionalSchema, RegistrarProfissionalDTO};
