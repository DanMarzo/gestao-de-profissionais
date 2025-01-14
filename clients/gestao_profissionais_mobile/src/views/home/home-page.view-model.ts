import {useEffect, useState} from 'react';
import {ResponseListDTO} from '../../infra/services/response/response-list.dto';
import {ProfissionalModel} from '../../models/profissional.model';
import {
  obterProfissionaisService,
  ObterProfissionaisServiceProps,
} from '../../infra/services/profissionais/obter-profissionais.service';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../redux/types';
import {getEspecialidadesAction} from '../../redux/stores/especialidade/especialidade.store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes/stacks/home.stack';
import {getProfissionaisAction} from '../../redux/stores/profissional/obter-profissionais.store';

const useHomePageViewModel = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const {especialidades, carregando: carregandoEspecialidades} = useSelector(
    (state: State) => state.especialidade,
  );
  const {
    carregando,
    indice,
    messageErrorGetProfissionais,
    profissionais,
    totalItens,
    numeroPaginas,
  } = useSelector((state: State) => state.obterProfissionais);
  const dispatch = useDispatch();
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [params, setParams] = useState<ObterProfissionaisServiceProps>({
    pagina: 1,
  });
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    setVisibleDropdown(false);
    setParams(rest => {
      return {...rest, especialidade};
    });
  };

  useEffect(() => {
    dispatch(getEspecialidadesAction());
    return () => {};
  }, []);

  useEffect(() => {
    obterProfissionais();
    return () => {};
  }, [params]);

  const obterProfissionais = () => {
    dispatch(getProfissionaisAction(params));
  };

  return {
    carregandoEspecialidades,
    especialidades,
    carregando,
    profissionais,
    params,
    visibleDropdown,
    handleEspecialidade,
    handleDropdown,
    navigate,
    obterProfissionais,
    numeroPaginas,
    totalItens,
    indice,
  };
};

export {useHomePageViewModel};
