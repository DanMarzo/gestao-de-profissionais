class EspecialidadeModel {
  id: number;
  nome: string;
  tipoDocumento: TipoDocEspecialidadeEnum;
}

enum TipoDocEspecialidadeEnum {
  CRM = 0,
  CRN = 1,
  CREFITO = 2,
  CRO = 3,
  COREN = 4,
  CRP = 5,
  CRF = 6,
  CREF = 7,
}
export { EspecialidadeModel, TipoDocEspecialidadeEnum };
