import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  formProfissionalSchema,
  RegistrarProfissionalDTO,
} from '../../../models/profissional.model';
import { useEffect, useState} from 'react';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {registrarProfissionalService} from '../../../infra/services/profissionais/registrar-profissional.service';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../types';
import { getEspecialidadesAction } from '../../../shared/state/especialidade/especialidade.state';
import { RootStackParamList } from '../../routes/stacks/home.stack';

const useRegistrarProfissionalViewModel = () => {
  const {
    setValue: setValueForm,
    handleSubmit,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
  const dispatch = useDispatch()
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();
  const [carregando, setCarregando] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [especialidadeSelect, setEspecialidadeSelect] = useState<EspecialidadeModel | undefined>(undefined);
  const {especialidades, carregando: carregandoEspecialidades, messageErrorGetEspecialidades} = useSelector((state: State) => state.especialidade);
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  const registrarProfissional = async (
    novoProfissional: RegistrarProfissionalDTO,
  ) => {
    try {
      setCarregando(true);
      const result = await registrarProfissionalService(novoProfissional);
      if (!result.error) {
        Toast(
          `Profissional ${novoProfissional.nome} - Doc. ${novoProfissional.numeroDocumento} Registrado!`,
          ToastAndroid.TOP,
        );
        goBack();
      } else {
        Toast('Não foi possível registrar profissional', ToastAndroid.TOP);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCarregando(false);
    }
  };

  const handleEspecialidade = (especialidade?: EspecialidadeModel) => {
    setVisibleDropdown(false);
    if (especialidade) {
      setEspecialidadeSelect(especialidade);
      setValueForm('especialidadeId', especialidade.id);
    }
  };

  useEffect(() => {
    dispatch(getEspecialidadesAction())
    return () => {}
  }, [])
  
  useEffect(() => {
    if(messageErrorGetEspecialidades){
      Toast(messageErrorGetEspecialidades, ToastAndroid.BOTTOM);
      goBack()
      return;
    }
    return () => {}
  }, [messageErrorGetEspecialidades])

  return {
    controlForm,
    errorsForm,
    especialidades,
    carregandoEspecialidades,
    especialidadeSelect,
    carregando,
    visibleDropdown,
    registrarProfissional,
    handleSubmit,
    handleEspecialidade,
    handleDropdown,
    goBack
  };
};

export {useRegistrarProfissionalViewModel};
