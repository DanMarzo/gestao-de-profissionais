// import {createContext, PropsWithChildren, useEffect, useState} from 'react';
// import {ProfissionalModel} from '../models/profissional.model';
// import {ResponseListDTO} from '../infra/services/response/response-list.dto';
// import {obterProfissionaisService} from '../infra/services/obter-profissionais.service';
// import {useRoute} from '@react-navigation/native';

// type AlertType = {
//   type: 'success' | 'danger';
//   message: string;
// };

// type ProfissionalContextProps = {
//   profissionais: ResponseListDTO<ProfissionalModel> | null;
//   carregando: boolean;
//   obterProfissionais: () => void;
//   nextPage: () => void;
//   previousPage: () => void;
//   obterIndicePagina: () => number;
//   handleIndiceEspecialidade: (indice: number, especialidade?: number) => void;
//   profissionalParaExcluir: ProfissionalModel | null;
//   profissionalParaAtualizar: ProfissionalModel | null;
//   handleProfissionalParaExcluir: (
//     profissional: ProfissionalModel | null,
//   ) => void;
//   handleProfissionalParaAtualizar: (
//     profissional: ProfissionalModel | null,
//   ) => void;
//   alertType: AlertType | null;
//   setAlert: (alert: AlertType | null) => void;
// };

// const ProfissionalContext = createContext<ProfissionalContextProps>(
//   {} as ProfissionalContextProps,
// );

// const ProfissionalProvider = ({children}: PropsWithChildren) => {
//   const [alertType, setAlertType] = useState<null | AlertType>(null);
//   const [profissionais, setProfissionais] =
//     useState<ResponseListDTO<ProfissionalModel> | null>(null);
//   const {params} = useRoute();

//   const [carregando, setCarregando] = useState(false);

//   const [profissionalParaAtualizar, setProfissionalParaAtualizar] =
//     useState<ProfissionalModel | null>(null);
//   const [profissionalParaExcluir, setProfissionalParaExcluir] =
//     useState<ProfissionalModel | null>(null);
//   const obterProfissionais = () => {
//     const indice = obterIndicePagina();
//     const especialidadeId = obterEspecialidadeId();
//     setCarregando(true);
//     obterProfissionaisService(indice, especialidadeId)
//       .then(res => {
//         if (!res.error) {
//           setProfissionais(res);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         //toast("Não foi possível carregar profissionais.", { type: "error" });
//         setProfissionais(null);
//       })
//       .finally(() => setCarregando(false));
//   };

//   const setAlert = (alert: AlertType | null) => {
//     setAlertType(alert);
//   };

//   const obterIndicePagina = () => {

//     if (!indice) return 1;
//     return Number.parseInt(indice);
//   };

//   const obterEspecialidadeId = () => {
//     const especialidade = searchParams.get('especialidade');
//     if (!especialidade) return undefined;
//     return Number.parseInt(especialidade);
//   };
//   const nextPage = () => {
//     if (
//       profissionais &&
//       !profissionais.error &&
//       obterIndicePagina() < profissionais.nroPaginas
//     ) {
//       setSearchParams({indice: (obterIndicePagina() + 1).toString()});
//     }
//   };
//   const previousPage = () => {
//     if (profissionais && !profissionais.error && obterIndicePagina() > 1) {
//       setSearchParams({indice: (obterIndicePagina() - 1).toString()});
//     }
//   };
//   const handleIndiceEspecialidade = (
//     indice: number,
//     especialidade?: number,
//   ) => {
//     setSearchParams({
//       indice: indice.toString(),
//       especialidade: especialidade ? especialidade.toString() : '',
//     });
//   };

//   const handleProfissionalParaExcluir = (
//     profissional: ProfissionalModel | null,
//   ) => {
//     setProfissionalParaExcluir(profissional);
//   };

//   const handleProfissionalParaAtualizar = (
//     profissional: ProfissionalModel | null,
//   ) => {
//     setProfissionalParaAtualizar(profissional);
//   };

//   useEffect(() => {
//     obterProfissionais();
//     return () => {};
//   }, [params]);

//   return (
//     <ProfissionalContext.Provider
//       value={{
//         setAlert,
//         handleProfissionalParaAtualizar,
//         handleProfissionalParaExcluir,
//         handleIndiceEspecialidade,
//         obterIndicePagina,
//         profissionais,
//         carregando,
//         obterProfissionais,
//         nextPage,
//         previousPage,
//         profissionalParaAtualizar,
//         profissionalParaExcluir,
//         alertType,
//       }}>
//       {children}
//     </ProfissionalContext.Provider>
//   );
// };

// export type {ProfissionalContextProps};
// export {ProfissionalProvider, ProfissionalContext};
