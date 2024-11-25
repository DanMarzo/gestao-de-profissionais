import { useContext, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { toast } from "react-toastify";
import { registrarProfissionalService } from "../../../infra/services/registrar-profissional.service";
import { EspecialidadeContext } from "../../../providers/Especialidade.context";
import { Modal } from "bootstrap";

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

const useExcluirProssionalViewModel = () => {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formValidationSchema) });
  const { carregando: carregandoEspec, especialidades } =
    useContext(EspecialidadeContext);

  const [loadingRegistro, setLoadingRegistro] = useState(false);

  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(
    null
  );
  const [tipoDocField, setTipoDocField] = useState<string | null>("");

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
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Ocorreu um erro ao registrar profissional.", {
          type: "error",
        });
      })
      .finally(() => {
        modal?.hide();
        setLoadingRegistro(false);
      });
  };

  useEffect(() => {
    const tipoDoc = especialidades.find((i) => i.id == especialidadeSelect);
    setTipoDocField(nomeTipoDocEspecialidadeEnum(tipoDoc?.tipoDocumento)); //
    return () => {};
  }, [especialidadeSelect]);

  const modalRef = useRef(null);
  const [modal, setModal] = useState<Modal | null>(null);
  const handleModal = (close: boolean) => {
    if (!close) {
      modal!.show();
    } else {
      modal!.hide();
    }
  };

  useEffect(() => {
    if (!modal && modalRef.current) {
      setModal(new Modal(modalRef.current, {}));
    }
    return () => {};
  }, []);

  return {
    carregandoEspec,
    loadingRegistro,
    registrarProfissional,
    handleSubmit,
    registerForm,
    errorsForm,
    especialidades,
    setEspecialidadeSelect,
    tipoDocField,
    modalRef,
    handleModal,
  };
};

export { useExcluirProssionalViewModel };
