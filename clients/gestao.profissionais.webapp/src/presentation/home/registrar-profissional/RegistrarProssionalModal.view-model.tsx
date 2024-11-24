import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EspecialidadeModel } from "../../../models/especialidade.model";

const formValidationSchema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome do profissional é obrigatorio")
    .min(3, "Minimo 3 caracteres"),
  numeroDocumento: yup
    .string()
    .required("Número do documento é obrigatorio.")
    .min(3, "Minimo 3 caracteres"),
  especialidadeId: yup.number().required(),
});

const useRegistrarProssionalViewModel = () => {
  const [especialidades, setEspecialidades] = useState<
    Array<EspecialidadeModel>
  >([]);
  const [loading, setLoading] = useState(false);
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formValidationSchema) });

  return { loading, handleSubmit, registerForm, errorsForm, especialidades };
};

export { useRegistrarProssionalViewModel };
