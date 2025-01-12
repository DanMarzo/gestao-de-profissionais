import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../../models/especialidade.model';
import {RootRouteProps, RootStackParamList} from '../../route';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AtualizarProfissionalDTO,
  formProfissionalSchema,
} from '../../../models/profissional.model';
import {useSelector} from 'react-redux';
import {getEspecialidadesAction} from '../../../shared/state/especialidade/especialidade.state';
import {atualizarProfissionalService} from '../../../infra/services/atualizar-profissional.service';
import {useAppDispatch} from '../../../redux/config-redux';
import {State} from '../../../types';

const useAtualizarProfissionalViewModel = () => {
  const {
    setValue: setValueForm,
    handleSubmit,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});

  const {params} = useRoute<RootRouteProps<'AtualizarProfissionalPage'>>();
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();

  const [especialidadeSelect, setEspecialidadeSelect] = useState<
    EspecialidadeModel | undefined
  >(undefined);
  const [isFocus, setIsFocus] = useState(false);
  const [readonly, setReadonly] = useState<boolean>(true);
  const handleDropdown = (value: boolean = true) => setIsFocus(value);
  const {especialidades, carregando, messageErrorGetEspecialidades} =
    useSelector((state: State) => state.especialidade);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {profissional} = params;
    setValueForm('nome', profissional.nome);
    setValueForm('numeroDocumento', profissional.numeroDocumento);
    getEspecialidade();
    dispatch(getEspecialidadesAction());
    return () => {};
  }, []);

  useEffect(() => {
    if (messageErrorGetEspecialidades) {
      Toast(messageErrorGetEspecialidades, ToastAndroid.BOTTOM);
      goBack();
      return;
    }
    if (especialidades.length != 0) {
      const especialidade = especialidades?.find(
        item => item.id == params.profissional.especialidade.id,
      );
      handleEspecialidade(especialidade);
      return;
    }
    return () => {};
  }, [messageErrorGetEspecialidades, especialidades]);

  const getEspecialidade = async () => {
    dispatch(getEspecialidadesAction());
  };

  const atualizarProfissioal = useMutation({
    mutationFn: (value: AtualizarProfissionalDTO) =>
      atualizarProfissionalService(params!.profissional.id, value),
    onSuccess: res => {
      const {data, error} = res;
      if (error) {
        Toast('Não foi possível atualizar profissional.', ToastAndroid.BOTTOM);
        return;
      }
      Toast(
        `Profissional ${data?.nome} - ${nomeTipoDocEspecialidadeEnum(
          data?.especialidade.tipoDocumento,
        )} ${data?.numeroDocumento}`,
        ToastAndroid.BOTTOM,
      );
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

  const handleReadonly = (state: boolean = false) => {
    setReadonly(state);
  };

  return {
    isFocus,
    errorsForm,
    especialidadeSelect,
    controlForm,
    especialidades,
    carregandoEspec: carregando,
    carregando: atualizarProfissioal.isPending,
    readonly,
    atualizar: atualizarProfissioal.mutate,
    handleSubmit,
    handleDropdown,
    handleEspecialidade,
    handleReadonly,
  };
};

export {useAtualizarProfissionalViewModel};
