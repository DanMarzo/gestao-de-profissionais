import { useContext, useEffect, useState } from "react";
import { ProfissionalModel } from "../../models/profissional.model";
import { ResponseListDTO } from "../../infra/services/response/response-list.dto";
import { useSearchParams } from "react-router-dom";
import { obterProfissionaisService } from "../../infra/services/obter-profissionais.service";
import { toast } from "react-toastify";
import { EspecialidadeContext } from "../../providers/Especialidade.context";

const HomeViewViewModel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listProfissionais, setListProfissionais] =
    useState<ResponseListDTO<ProfissionalModel> | null>();
  const [loading, setLoading] = useState(false);

  const { carregando: carregandoEsp, especialidades } =
    useContext(EspecialidadeContext);

  const obterProfissionais = () => {
    const indice = obterIndicePagina();
    setLoading(true);
    obterProfissionaisService(indice)
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
  };
};

export { HomeViewViewModel };
