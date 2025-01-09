import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {PropsAtualizarProfissional} from './AtualizarProfissionalPage';
import {useCallback, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {obterEspecialidadesService} from '../../../infra/services/obter-especialidades.service';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {RootStackParamList} from '../../route';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AtualizarProfissionalDTO,
  formProfissionalSchema,
} from '../../../models/profissional.model';
import {useDispatch, useSelector} from 'react-redux';
import {especialidadeSelector} from '../../../shared/state/especialidade/especialidade.selector';
import {especialidadeActions} from '../../../shared/state/especialidade/especialidade.state';
import {atualizarProfissionalService} from '../../../infra/services/atualizar-profissional.service';

const useAtualizarProfissionalViewModel = () => {
  const {
    setValue: setValueForm,
    handleSubmit,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();
  const {params} = useRoute<RouteProp<PropsAtualizarProfissional>>();
  const [especialidadeSelect, setEspecialidadeSelect] = useState<EspecialidadeModel | undefined>(undefined);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);
  const stateEspect = useSelector(especialidadeSelector);
  const dispatch = useDispatch();

  useFocusEffect(() => {
    useCallback(() => {
      requestEspecialidades.mutate();
    }, []);
  });

  const requestEspecialidades = useMutation({
    mutationFn: () => obterEspecialidadesService(),
    onError: err => console.log(err),
    onSuccess: data => {
      if (!data.error) {
        Toast('Não foi possível obter especialidades.', ToastAndroid.BOTTOM);
        goBack();
        return;
      }
      dispatch(especialidadeActions.setEspecialidades(data.data ?? []));
      const especialidade = data.data?.find(
        item => item.id == params.especialidade.id,
      );
      if (!especialidade) {
        Toast(
          'Especialidade do profissional nao localizada.',
          ToastAndroid.BOTTOM,
        );
      } else {
        setEspecialidadeSelect(especialidade);
        setValueForm('especialidadeId', especialidade.id);
      }
      setValueForm('nome', params.nome);
      setValueForm('numeroDocumento', params.numeroDocumento);
    },
  });

  const atualizarProfissioal = useMutation({
    mutationFn: (value: AtualizarProfissionalDTO) =>
      atualizarProfissionalService(params.id, value),
  });

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    handleDropdown(false);
    if (especialidade) {
      setEspecialidadeSelect(especialidade);
      setValueForm('especialidadeId', especialidade.id);
    }
  };

  return {
    visibleDropdown,
    errorsForm,
    especialidadeSelect,
    controlForm,
    handleSubmit,
    atualizar: atualizarProfissioal.mutate,
    handleDropdown,
    handleEspecialidade,
    especialidades: stateEspect,
    carregandoEspec: requestEspecialidades.isPending,
    carregando: atualizarProfissioal.isPending,
  };
};

export {useAtualizarProfissionalViewModel};
