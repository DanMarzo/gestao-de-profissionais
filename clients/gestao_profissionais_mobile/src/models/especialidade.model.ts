class EspecialidadeModel {
  id: number;
  nome: string;
  tipoDocumento: TipoDocEspecialidadeEnum;
}
//Nao coloquei na classe pois para isso eu teria de fazer um parse para o js reconhecer como classe
const nomeTipoDocEspecialidadeEnum = (
  value?: TipoDocEspecialidadeEnum
): string => {
  let nome = "";
  switch (value) {
    case TipoDocEspecialidadeEnum.CRM:
      nome = "CRM";
      break;
    case TipoDocEspecialidadeEnum.CRN:
      nome = "CRN";
       break;
    case TipoDocEspecialidadeEnum.CREFITO:
      nome = "CREFITO";
       break;
    case TipoDocEspecialidadeEnum.CRO:
      nome = "CRO";
       break;
    case TipoDocEspecialidadeEnum.COREN:
      nome = "COREN";
       break;
    case TipoDocEspecialidadeEnum.CRP:
      nome = "CRP";
       break;
    case TipoDocEspecialidadeEnum.CRF:
      nome ="CRF";
       break;
    case TipoDocEspecialidadeEnum.CREF:
      nome = "CREF";
       break;
  }
  return nome
};

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
export {
  EspecialidadeModel,
  TipoDocEspecialidadeEnum,
  nomeTipoDocEspecialidadeEnum,
};
