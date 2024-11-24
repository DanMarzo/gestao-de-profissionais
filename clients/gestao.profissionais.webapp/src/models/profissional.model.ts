import { EspecialidadeModel } from "./especialidade.model";

class ProfissionalModel {
  id: number;
  nome: string;
  numeroDocumento: string;
  //Para tratar evitar erros no tratamento de datas, eu recebo como string
  criadoEm: string;
  especialidade: EspecialidadeModel
}
export { ProfissionalModel };
