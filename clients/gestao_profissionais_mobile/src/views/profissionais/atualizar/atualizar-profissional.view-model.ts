import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from '../../../models/especialidade.model';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AtualizarProfissionalDTO,
  formProfissionalSchema,
} from '../../../models/profissional.model';
import {atualizarProfissionalService} from '../../../infra/services/profissionais/atualizar-profissional.service';
import {
  RootRouteProps,
  RootStackParamList,
} from '../../routes/stacks/home.stack';
import {obterEspecialidadesService} from '../../../infra/services/especialidades/obter-especialidades.service';

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

  useEffect(() => {
    const {profissional} = params;
    setValueForm('nome', profissional.nome);
    setValueForm('numeroDocumento', profissional.numeroDocumento);
    if (especialidadesQuery.data?.data?.length == 0) {
      especialidadesQuery.refetch();
    }
    return () => {};
  }, []);

  const especialidadesQuery = useQuery({
    queryFn: () => obterEspecialidadesService(),
    queryKey: ['queryEspecialidades'],
  });

  useEffect(() => {
    if (especialidadesQuery.isError) {
      Toast('Não foi possível obter as especialidades.', ToastAndroid.BOTTOM);
      goBack();
      return;
    }
    if (especialidadesQuery.data?.data?.length != 0) {
      const especialidade = especialidadesQuery.data?.data?.find(
        item => item.id == params.profissional.especialidade.id,
      );
      handleEspecialidade(especialidade);
      return;
    }
  }, [especialidadesQuery.data?.data]);

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
    especialidades: especialidadesQuery.data?.data ?? [],
    carregandoEspec: especialidadesQuery.isPending,
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
