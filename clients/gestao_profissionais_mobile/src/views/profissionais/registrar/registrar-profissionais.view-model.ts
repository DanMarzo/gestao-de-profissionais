import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  formProfissionalSchema,
  RegistrarProfissionalDTO,
} from '../../../models/profissional.model';
import { useEffect, useState} from 'react';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {registrarProfissionalService} from '../../../infra/services/registrar-profissional.service';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../../route';
import { useSelector } from 'react-redux';
import { especialidadeStateSelector } from '../../../shared/state/especialidade/especialidade.selector';

const useRegistrarProfissionalViewModel = () => {
  const {especialidades} = useSelector(especialidadeStateSelector)
  const {
    setValue: setValueForm,
    handleSubmit,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();
  const [carregando, setCarregando] = useState(false);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const [especialidadeSelect, setEspecialidadeSelect] = useState<
    EspecialidadeModel | undefined
  >(undefined);
  const handleDropdown = (value: boolean = true) => setVisibleDropdown(value);

  // const especialidadeContext = useContext(EspecialidadeContext);

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
    if (especialidadeSelect) {
      setValueForm("especialidadeId", especialidadeSelect.id);
    }
    return () => {};
  }, []);

  return {
    controlForm,
    errorsForm,
    especialidades,
    carregandoEspecialidade: true,
    especialidadeSelect,
    carregando,
    visibleDropdown,
    registrarProfissional,
    handleSubmit,
    handleEspecialidade,
    handleDropdown
  };
};

export {useRegistrarProfissionalViewModel};
