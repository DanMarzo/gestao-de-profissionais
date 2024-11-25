import { useContext, useEffect, useState } from "react";
import { ProfissionalModel } from "../../models/profissional.model";
import { ResponseListDTO } from "../../infra/services/response/response-list.dto";
import { useSearchParams } from "react-router-dom";
import { obterProfissionaisService } from "../../infra/services/obter-profissionais.service";
import { toast } from "react-toastify";
import { EspecialidadeContext } from "../../providers/Especialidade.context";
import { EspecialidadeModel } from "../../models/especialidade.model";

const HomeViewViewModel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listProfissionais, setListProfissionais] =
    useState<ResponseListDTO<ProfissionalModel> | null>();
  const [loading, setLoading] = useState(false);
  const { carregando: carregandoEsp, especialidades } =
    useContext(EspecialidadeContext);

  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<EspecialidadeModel | null>(null);

  const handleSetEspecialidade = (especialidade: EspecialidadeModel | null) => {
    const indice = obterIndicePagina();
    setSearchParams({
      indice: indice.toString(),
      especialidade: especialidade ? especialidade!.id.toString() : "",
    });
    setEspecialidadeSelecionada(especialidade);
  };
  const obterProfissionais = () => {
    const indice = obterIndicePagina();
    const especialidadeId = obterEspecialidadeId();
    setLoading(true);
    obterProfissionaisService(indice, especialidadeId)
      .then((res) => {
        if (!res.error) {
          setListProfissionais(res);
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Não foi possível carregar profissionais.", { type: "error" });
        setListProfissionais(null);
      })
      .finally(() => setLoading(false));
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
      listProfissionais &&
      !listProfissionais.error &&
      obterIndicePagina() < listProfissionais.nroPaginas
    ) {
      setSearchParams({ indice: (obterIndicePagina() + 1).toString() });
    }
  };
  const previousPage = () => {
    if (
      listProfissionais &&
      !listProfissionais.error &&
      obterIndicePagina() > 1
    ) {
      setSearchParams({ indice: (obterIndicePagina() - 1).toString() });
    }
  };

  return {
    especialidades,
    loading,
    listProfissionais,
    setSearchParams,
    nextPage,
    previousPage,
    carregandoEsp,
    especialidadeSelecionada,
    handleSetEspecialidade,
  };
};

export { HomeViewViewModel };
