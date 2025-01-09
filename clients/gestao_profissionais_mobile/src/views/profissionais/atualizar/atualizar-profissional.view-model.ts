import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {obterEspecialidadesService} from '../../../infra/services/obter-especialidades.service';
import {EspecialidadeModel, nomeTipoDocEspecialidadeEnum} from '../../../models/especialidade.model';
import {RootRouteProps, RootStackParamList} from '../../route';
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
  const {params} = useRoute<RootRouteProps<'AtualizarProfissionalPage'>>();

  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();
  const [especialidadeSelect, setEspecialidadeSelect] = useState<EspecialidadeModel | undefined>(undefined);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);
  const stateEspect = useSelector(especialidadeSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const {profissional} = params;
    setValueForm('nome', profissional.nome);
    setValueForm('numeroDocumento', profissional.numeroDocumento);
    requestEspecialidades.mutate();
    return () => {};
  }, []);

  const requestEspecialidades = useMutation({
    mutationFn: () => obterEspecialidadesService(),
    onError: err => console.log(err),
    onSuccess: data => {
      if (data.error) {
        Toast('Não foi possível obter especialidades.', ToastAndroid.BOTTOM);
        goBack();
        return;
      }
      dispatch(especialidadeActions.setEspecialidades(data.data ?? []));
      const especialidade = data.data?.find(
        item => item.id == params!.profissional.especialidade.id,
      );
      if (especialidade) {
        setEspecialidadeSelect(especialidade);
        setValueForm('especialidadeId', especialidade.id);
        return;
      }
      Toast(
        'Especialidade do profissional nao localizada.',
        ToastAndroid.BOTTOM,
      );
    },
  });

  const atualizarProfissioal = useMutation({
    mutationFn: (value: AtualizarProfissionalDTO) =>
      atualizarProfissionalService(params!.profissional.id, value),
    onSuccess: res => {
      const {data,error} = res
      if (error) {
        Toast('Não foi possível atualizar profissional.', ToastAndroid.BOTTOM);
        return;
      }
      Toast(`Profissional ${data?.nome} - ${nomeTipoDocEspecialidadeEnum(data?.especialidade.tipoDocumento)} ${data?.numeroDocumento}`, ToastAndroid.BOTTOM);
      goBack();
      goBack();
    },
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
