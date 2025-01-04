import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {formProfissionalSchema} from '../../../models/profissional.model';
import {useContext, useState} from 'react';
import {EspecialidadeContext} from '../../../providers/Especialidade.context';
import {IndexPath} from '@ui-kitten/components';

const useRegistrarProssionalViewModel = () => {
  const {
    register,
    handleSubmit,
    reset,
    control: controlForm,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
  const [tipoDocField, setTipoDocField] = useState<string | null>('');
  const [carregando, setCarregando] = useState(false);
  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  );
  const especialidadeContext = useContext(EspecialidadeContext);

  const registrarProfissional = (values: any) => {
    console.log(values);
  };

  return {
    controlForm,
    errorsForm,
    handleSubmit,
    register,
    registrarProfissional,
    especialidades: especialidadeContext.especialidades,
    carregandoEspecialidade: especialidadeContext.carregando,
    selectedIndex, setSelectedIndex
  };
};

export {useRegistrarProssionalViewModel};
