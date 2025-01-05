import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  formProfissionalSchema,
  RegistrarProfissionalDTO,
} from '../../../models/profissional.model';
import {useContext, useEffect, useState} from 'react';
import {EspecialidadeContext} from '../../../providers/Especialidade.context';
// import {IndexPath} from '@ui-kitten/components';
import {EspecialidadeModel} from '../../../models/especialidade.model';
import {registrarProfissionalService} from '../../../infra/services/registrar-profissional.service';
import {Toast} from '../../../shared/theme/toasts';
import {ToastAndroid} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../App';

const useRegistrarProfissionalViewModel = () => {
  const {
    setValue: setValueForm,
    handleSubmit,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
  const {goBack} = useNavigation<NavigationProp<RootStackParamList>>();
  const [carregando, setCarregando] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [especialidade, setEspecialidade] = useState<EspecialidadeModel | undefined>(undefined);
  const especialidadeContext = useContext(EspecialidadeContext);

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

  const handleEspecialidade = (index: number) => {
    let espec = especialidadeContext.especialidades[index];
    setEspecialidade(espec);
    setValueForm('especialidadeId', espec.id);
  };

  useEffect(() => {
    if (especialidade) {
      let index = especialidadeContext.especialidades.indexOf(especialidade);
      setSelectedIndex(index);
    }
    return () => {};
  }, []);

  return {
    controlForm,
    errorsForm,
    handleSubmit,
    registrarProfissional,
    especialidades: especialidadeContext.especialidades,
    carregandoEspecialidade: especialidadeContext.carregando,
    selectedIndex,
    handleEspecialidade,
    especialidade,
    carregando,
  };
};

export {useRegistrarProfissionalViewModel};
