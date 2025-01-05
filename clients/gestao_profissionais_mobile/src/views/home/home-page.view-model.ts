import {useContext, useEffect, useState} from 'react';
import {EspecialidadeContext} from '../../providers/Especialidade.context';
import {ResponseListDTO} from '../../infra/services/response/response-list.dto';
import {ProfissionalModel} from '../../models/profissional.model';
import {obterProfissionaisService} from '../../infra/services/obter-profissionais.service';
import {EspecialidadeModel} from '../../models/especialidade.model';

const useHomePageViewModel = () => {
  const {carregando: carregandoEsp, especialidades} = useContext(EspecialidadeContext);
  const [carregando, setCarregando] = useState(false);
  const [profissionais, setProfissionais] = useState<ResponseListDTO<ProfissionalModel> | null>(null);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [especialidadeSelect, setEspecialidadeSelect] = useState<
    EspecialidadeModel | undefined
  >(undefined);
  const [params, setParams] = useState<{
    especialidadeId?: number;
    indice: number;
  }>({indice: 1});

  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    setVisibleDropdown(false);
    setEspecialidadeSelect(especialidade);
  };

  useEffect(() => {
    obterProfissionais();
    return () => {};
  }, [params]);

  const obterProfissionais = () => {
    const indice = params.indice;
    const especialidadeId = params.especialidadeId;
    setCarregando(true);
    obterProfissionaisService(indice, especialidadeId)
      .then(res => {
        if (!res.error) {
          setProfissionais(res);
        }
      })
      .catch(err => {
        setProfissionais(null);
      })
      .finally(() => setCarregando(false));
  };

  return {
    carregandoEsp,
    especialidades,
    carregando,
    profissionais,
    params,
    especialidadeSelect,
    visibleDropdown,
    obterProfissionais,
    handleEspecialidade,
    handleDropdown
  };
};

export {useHomePageViewModel};
