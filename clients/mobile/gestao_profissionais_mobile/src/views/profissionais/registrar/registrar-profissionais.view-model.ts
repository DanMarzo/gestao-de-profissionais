import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  formProfissionalSchema,
  RegistrarProfissionalDTO,
} from '../../../models/profissional.model';
import {useEffect, useState} from 'react';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {registrarProfissionalService} from '../../../infra/services/profissionais/registrar-profissional.service';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/stacks/home.stack';
import {useMutation, useQuery} from '@tanstack/react-query';
import {obterEspecialidadesService} from '../../../infra/services/especialidades/obter-especialidades.service';

const useRegistrarProfissionalViewModel = () => {
  const {
    setValue: setValueForm,
    handleSubmit,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [especialidadeSelect, setEspecialidadeSelect] = useState<
    EspecialidadeModel | undefined
  >(undefined);
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  const especialidadesMutate = useQuery({
    queryFn: () => obterEspecialidadesService(),
    queryKey: ['queryEspecialidades'],
  });

  const registrarProfissionalMutate = useMutation({
    mutationFn: (novoProfissional: RegistrarProfissionalDTO) =>
      registrarProfissionalService(novoProfissional),
    onSuccess: data => {
      if (data.error) {
        Toast('Não foi possível registrar profissional.', ToastAndroid.BOTTOM);
        goBack();
        return undefined;
      }
      return undefined;
    },
  });

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    setVisibleDropdown(false);
    if (especialidade) {
      setEspecialidadeSelect(especialidade);
      setValueForm('especialidadeId', especialidade.id);
    }
  };

  useEffect(() => {
    if (especialidadesMutate.data?.data?.length == 0) {
      especialidadesMutate.refetch();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (especialidadesMutate.isError) {
      Toast('Não foi possível obter especialidades.', ToastAndroid.BOTTOM);
      goBack();
      return;
    }
    return () => {};
  }, [especialidadesMutate.data?.data]);

  return {
    controlForm,
    errorsForm,
    especialidades: especialidadesMutate.data?.data ?? [],
    carregandoEspecialidades: especialidadesMutate.isPending,
    especialidadeSelect,
    carregando: registrarProfissionalMutate.isPending,
    visibleDropdown,
    registrarProfissional: registrarProfissionalMutate.mutate,
    handleSubmit,
    handleEspecialidade,
    handleDropdown,
    goBack,
  };
};

export {useRegistrarProfissionalViewModel};
