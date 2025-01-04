import {useContext, useEffect, useState} from 'react';
import {EspecialidadeContext} from '../../providers/Especialidade.context';
import {ResponseListDTO} from '../../infra/services/response/response-list.dto';
import {ProfissionalModel} from '../../models/profissional.model';
import {RouteProp, useRoute} from '@react-navigation/native';
import {obterProfissionaisService} from '../../infra/services/obter-profissionais.service';

const HomePageViewModel = () => {
  const {carregando: carregandoEsp, especialidades} = useContext(EspecialidadeContext);
  const [carregando, setCarregando] = useState(false);
  const [profissionais, setProfissionais] = useState<ResponseListDTO<ProfissionalModel> | null>(null);

  const [params, setParams] = useState<{
    especialidadeId?: number ;
    indice: number;
  }>({indice: 1});

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
        console.log("------ ERRO")
        console.log(err);
        setProfissionais(null);
      })
      .finally(() => setCarregando(false));
  };

  return {carregandoEsp, especialidades, carregando, profissionais, params ,obterProfissionais};
};

export {HomePageViewModel};
