import {useEffect, useState} from 'react';
import {ObterProfissionaisServiceProps} from '../../infra/services/profissionais/obter-profissionais.service';
import {EspecialidadeModel} from '../../models/especialidade.model';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../redux/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes/stacks/home.stack';
import {getProfissionaisAction} from '../../redux/stores/profissional/obter-profissionais.store';
import {useQuery} from '@tanstack/react-query';
import {obterEspecialidadesService} from '../../infra/services/especialidades/obter-especialidades.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useHomePageViewModel = () => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  AsyncStorage.getItem('client_http').then(res => {
    if (!res) {
      navigate('RegisterHostView');
    }
  });

  const [params, setParams] = useState<ObterProfissionaisServiceProps>({
    pagina: 1,
    itens: 5,
  });
  const obterProfissionaisState = useSelector(
    (state: State) => state.obterProfissionais,
  );
  const dispatch = useDispatch();
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    setVisibleDropdown(false);
    setParams(rest => {
      return {...rest, especialidade};
    });
  };

  const handlePerPage = (qtdeItens: number) => {
    setParams(rest => {
      return {...rest, itens: qtdeItens};
    });
  };
  const handlePage = (pagina: number) => {
    setParams(rest => {
      return {...rest, pagina};
    });
  };

  const clearSelect = () => {
    setParams(rest => {
      return {...rest, especialidade: undefined};
    });
  };

  useEffect(() => {
    dispatch(getProfissionaisAction(params));
    return () => {};
  }, [params]);

  const queryEspecialidades = useQuery({
    queryKey: ['queryEspecialidades'],
    queryFn: () => obterEspecialidadesService(),
  });

  return {
    carregandoEspecialidades: queryEspecialidades.isLoading,
    especialidades: queryEspecialidades.data?.data ?? [],
    params,
    visibleDropdown,
    obterProfissionaisState,
    handleEspecialidade,
    handleDropdown,
    navigate,
    obterProfissionais: () => dispatch(getProfissionaisAction(params)),
    handlePerPage,
    handlePage,
    clearSelect,
  };
};

export {useHomePageViewModel};
