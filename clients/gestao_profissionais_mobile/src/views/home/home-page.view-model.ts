import {useEffect, useState} from 'react';
import {ResponseListDTO} from '../../infra/services/response/response-list.dto';
import {ProfissionalModel} from '../../models/profissional.model';
import {
  obterProfissionaisService,
  ObterProfissionaisServiceProps,
} from '../../infra/services/profissionais/obter-profissionais.service';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../types';
import {getEspecialidadesAction} from '../../shared/state/especialidade/especialidade.state';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes/stacks/home.stack';

const useHomePageViewModel = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {especialidades, carregando: carregandoEspecialidades} = useSelector((state: State) => state.especialidade);
  const dispatch = useDispatch();
  const [carregando, setCarregando] = useState(false);
  const [profissionais, setProfissionais] = useState<ResponseListDTO<ProfissionalModel> | null>(null);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [params, setParams] = useState<ObterProfissionaisServiceProps>({pagina: 1});
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    setVisibleDropdown(false);
    setParams((rest)=>{
      return {...rest, especialidade}
    });
  };

  useEffect(() => {
    obterProfissionais();
    dispatch(getEspecialidadesAction());
    return () => {};
  }, [params]);

  const obterProfissionais = () => {
    setCarregando(true);
    obterProfissionaisService(params)
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
    carregandoEspecialidades,
    especialidades,
    carregando,
    profissionais,
    params,
    visibleDropdown,
    obterProfissionais,
    handleEspecialidade,
    handleDropdown,
    navigate,
  };
};

export {useHomePageViewModel};
