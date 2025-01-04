import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {formProfissionalSchema} from '../../../models/profissional.model';
import {useState} from 'react';

const RegistrarProssionalViewModel = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors: errorsForm},
  } = useForm({resolver: yupResolver(formProfissionalSchema)});
    const [tipoDocField, setTipoDocField] = useState<string | null>("");

  const [carregando, setCarregando] = useState(false);
  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(null);
  
  return {};
};

export {RegistrarProssionalViewModel};
