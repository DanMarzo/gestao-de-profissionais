import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProfissionalModel } from "../models/profissional.model";
import { obterProfissionaisService } from "../infra/services/obter-profissionais.service";
import { useSearchParams } from "react-router-dom";
import { ResponseListDTO } from "../infra/services/response/response-list.dto";

interface ProfissionalContextProps {
  profissionais: ResponseListDTO<ProfissionalModel> | null;
  carregando: boolean;
  obterProfissionais: () => void;
  nextPage: () => void;
  previousPage: () => void;
  obterIndicePagina: () => number;
  handleIndiceEspecialidade: (indice: number, especialidade?: number) => void;
  profissionalParaExcluir: ProfissionalModel | null;
  profissionalParaAtualizar: ProfissionalModel | null;
  handleProfissionalParaExcluir: (
    profissional: ProfissionalModel | null
  ) => void;
  handleProfissionalParaAtualizar: (
    profissional: ProfissionalModel | null
  ) => void;
}

const ProfissionalContext = createContext<ProfissionalContextProps>(
  {} as ProfissionalContextProps
);

const ProfissionalProvider = ({ children }: PropsWithChildren) => {
  const [profissionais, setProfissionais] =
    useState<ResponseListDTO<ProfissionalModel> | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [carregando, setCarregando] = useState(false);

  const [profissionalParaAtualizar, setProfissionalParaAtualizar] =
    useState<ProfissionalModel | null>(null);
  const [profissionalParaExcluir, setProfissionalParaExcluir] =
    useState<ProfissionalModel | null>(null);
  const obterProfissionais = () => {
    const indice = obterIndicePagina();
    const especialidadeId = obterEspecialidadeId();
    setCarregando(true);
    obterProfissionaisService(indice, especialidadeId)
      .then((res) => {
        if (!res.error) {
          setProfissionais(res);
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Não foi possível carregar profissionais.", { type: "error" });
        setProfissionais(null);
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    obterProfissionais();
    return () => {};
  }, [searchParams]);

  const obterIndicePagina = () => {
    const indice = searchParams.get("indice");
    if (!indice) return 1;
    return Number.parseInt(indice);
  };

  const obterEspecialidadeId = () => {
    const especialidade = searchParams.get("especialidade");
    if (!especialidade) return undefined;
    return Number.parseInt(especialidade);
  };
  const nextPage = () => {
    if (
      profissionais &&
      !profissionais.error &&
      obterIndicePagina() < profissionais.nroPaginas
    ) {
      setSearchParams({ indice: (obterIndicePagina() + 1).toString() });
    }
  };
  const previousPage = () => {
    if (profissionais && !profissionais.error && obterIndicePagina() > 1) {
      setSearchParams({ indice: (obterIndicePagina() - 1).toString() });
    }
  };
  const handleIndiceEspecialidade = (
    indice: number,
    especialidade?: number
  ) => {
    setSearchParams({
      indice: indice.toString(),
      especialidade: especialidade ? especialidade.toString() : "",
    });
  };

  const handleProfissionalParaExcluir = (
    profissional: ProfissionalModel | null
  ) => {
    setProfissionalParaExcluir(profissional);
  };

  const handleProfissionalParaAtualizar = (
    profissional: ProfissionalModel | null
  ) => {
    setProfissionalParaAtualizar(profissional);
  };

  return (
    <ProfissionalContext.Provider
      value={{
        handleProfissionalParaAtualizar,
        handleProfissionalParaExcluir,
        handleIndiceEspecialidade,
        obterIndicePagina,
        profissionais,
        carregando,
        obterProfissionais,
        nextPage,
        previousPage,
        profissionalParaAtualizar,
        profissionalParaExcluir,
      }}
    >
      {children}
    </ProfissionalContext.Provider>
  );
};

export type { ProfissionalContextProps };
export { ProfissionalProvider, ProfissionalContext };
