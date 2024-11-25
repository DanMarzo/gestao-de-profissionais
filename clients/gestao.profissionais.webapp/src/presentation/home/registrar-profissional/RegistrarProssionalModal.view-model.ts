import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  EspecialidadeModel,
  nomeTipoDocEspecialidadeEnum,
} from "../../../models/especialidade.model";
import { obterEspecialidadesService } from "../../../infra/services/obter-especialidades.service";
import { toast } from "react-toastify";
import { registrarProfissionalService } from "../../../infra/services/registrar-profissional.service";

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
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formValidationSchema) });
  const [loadingEspec, setLoadingEspec] = useState(false);
  const [loadingRegistro, setLoadingRegistro] = useState(false);

  const [especialidades, setEspecialidades] = useState<
    Array<EspecialidadeModel>
  >([]);

  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(
    null
  );
  const [tipoDocField, setTipoDocField] = useState<string | null>("");

  const obterEspecialidades = async () => {
    setLoadingEspec(true);
    obterEspecialidadesService()
      .then((result) => {
        if (result.error) {
          toast("Não foi possível obter todas especialidades.", {
            type: "warning",
          });
        } else {
          setEspecialidades(result.data ?? []);
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Ocorreu um erro ao obter as especialidades.", {
          type: "error",
        });
      })
      .finally(() => setLoadingEspec(false));
  };

  const registrarProfissional = (values: any) => {
    setLoadingRegistro(true);
    registrarProfissionalService(values)
      .then((res) => {
        if (res.error) {
          toast("Não foi possível registrar profissional.", {
            type: "warning",
          });
        } else {
          toast("Profissional registrado.", { type: "success" });
          location.href = `${res.data?.id}`;
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Ocorreu um erro ao registrar profissional.", {
          type: "error",
        });
      })
      .finally(() => setLoadingRegistro(false));
  };

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

  return {
    loadingEspec,
    loadingRegistro,
    registrarProfissional,
    handleSubmit,
    registerForm,
    errorsForm,
    especialidades,
    setEspecialidadeSelect,
    tipoDocField,
  };
};

export { useRegistrarProssionalViewModel };
