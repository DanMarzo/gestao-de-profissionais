import { useContext, useState } from "react";
import { EspecialidadeContext } from "../../providers/Especialidade.context";
import { EspecialidadeModel } from "../../models/especialidade.model";
import { ProfissionalContext } from "../../providers/Profissional.context";
import { useSearchParams } from "react-router-dom";

const HomeViewViewModel = () => {
  const {
    nextPage,
    previousPage,
    profissionais,
    obterIndicePagina,
    carregando,
    handleIndiceEspecialidade,
  } = useContext(ProfissionalContext);

  const [_, setSearchParams]  = useSearchParams()
  const { carregando: carregandoEsp, especialidades } =
    useContext(EspecialidadeContext);

  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<EspecialidadeModel | null>(null);

  const handleSetEspecialidade = (especialidade: EspecialidadeModel | null) => {
    const indice = obterIndicePagina();
    handleIndiceEspecialidade(indice, especialidade?.id);
    setEspecialidadeSelecionada(especialidade);
  };

  return {
    especialidades,
    carregando,
    profissionais,
    nextPage,
    previousPage,
    carregandoEsp,
    especialidadeSelecionada,
    handleSetEspecialidade,setSearchParams
  };
};

export { HomeViewViewModel };
