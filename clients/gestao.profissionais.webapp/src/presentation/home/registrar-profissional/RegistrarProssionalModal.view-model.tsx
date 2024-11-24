import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from "../../../models/especialidade.model";
import { obterEspecialidadesService } from "../../../infra/services/obter-especialidades.service";

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
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState<
    Array<EspecialidadeModel>
  >([]);

  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(
    null
  );
  const [tipoDocField, setTipoDocField] = useState<string | null>("");

  const obterEspecialidades = async () =>
    obterEspecialidadesService()
      .then((result) => {
        console.log(result);
        if (result.error) {
          console.log(result);
          //notificacao
        } else {
          setEspecialidades(result.data ?? []);
        }
      })
      .catch((err) => {
        console.log(err);
        location.reload();
        //notificacao
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    if (especialidades.length == 0) {
      obterEspecialidades();
    }
    return () => {
      setEspecialidades([]);
    };
  }, []);

  useEffect(() => {
    const tipoDoc = especialidades.find((i) => i.id == especialidadeSelect);
    setTipoDocField(nomeTipoDocEspecialidadeEnum(tipoDoc?.tipoDocumento)); //
    return () => {};
  }, [especialidadeSelect]);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formValidationSchema) });

  return { loading, handleSubmit, registerForm, errorsForm, especialidades };
};

export { useRegistrarProssionalViewModel };
