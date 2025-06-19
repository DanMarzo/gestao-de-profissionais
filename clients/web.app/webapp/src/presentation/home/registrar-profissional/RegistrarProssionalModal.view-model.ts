import { useContext, useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { registrarProfissionalService } from "../../../infra/services/registrar-profissional.service";
import { EspecialidadeContext } from "../../../providers/Especialidade.context";
import { Modal } from "bootstrap";
import { formProfissionalSchema } from "../../../models/profissional.model";
import { ProfissionalContext } from "../../../providers/Profissional.context";

const useRegistrarProssionalViewModel = () => {
  const {
    register: registerForm,
    handleSubmit,
    reset,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formProfissionalSchema) });
  const { carregando: carregandoEspec, especialidades } =
    useContext(EspecialidadeContext);
  const { setAlert, obterProfissionais } = useContext(ProfissionalContext);

  const [carregando, setCarregando] = useState(false);

  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(
    null
  );
  const [tipoDocField, setTipoDocField] = useState<string | null>("");

  const registrarProfissional = (values: any) => {
    setCarregando(true);
    registrarProfissionalService(values)
      .then((res) => {
        if (res.error) {
          setAlert({
            message: "Houve um erro ao registrar o profissional!.",
            type: "danger",
          });
        } else {
          setAlert({
            message: "Profissional registrado com sucesso!",
            type: "success",
          });
          obterProfissionais();
        }
      })
      .catch(() => {
        setAlert({
          message: "Houve um erro ao registrar o profissional!.",
          type: "danger",
        });
      })
      .finally(() => {
        reset();
        setEspecialidadeSelect(null);
        modal?.hide();
        setCarregando(false);
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
    carregando,
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

export { useRegistrarProssionalViewModel };
