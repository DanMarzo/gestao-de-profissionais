import { useContext, useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { EspecialidadeContext } from "../../../providers/Especialidade.context";
import { Modal } from "bootstrap";
import { ProfissionalContext } from "../../../providers/Profissional.context";
import { atualizarProfissionalService } from "../../../infra/services/atualizar-profissional.service";
import { formProfissionalSchema } from "../../../models/profissional.model";

const useAtualizarProssionalViewModel = () => {
  const {
    register: registerForm,
    handleSubmit,
    setValue,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formProfissionalSchema) });
  const { carregando: carregandoEspec, especialidades } =
    useContext(EspecialidadeContext);

  const {
    setAlert,
    profissionalParaAtualizar,
    obterProfissionais,
    handleProfissionalParaAtualizar,
  } = useContext(ProfissionalContext);

  const [carregando, setCarregando] = useState(false);

  const [especialidadeSelect, setEspecialidadeSelect] = useState<number | null>(
    null
  );
  const [tipoDocField, setTipoDocField] = useState<string | null>("");

  const modalAtualizarRef = useRef(null);
  const [modal, setModal] = useState<Modal | null>(null);
  const handleModal = (close: boolean) => {
    if (!close) {
      modal!.show();
    } else {
      modal!.hide();
    }
  };

  const atualizarProfisional = (values: any) => {
    setCarregando(true);
    atualizarProfissionalService(profissionalParaAtualizar!.id!, values)
      .then((res) => {
        if (!res.error) {
          setAlert({
            message: `Profissional ${res.data?.nome} atualizado com sucesso!`,
            type: "success",
          });
          obterProfissionais();
        } else
          setAlert({
            message: `Houve um erro ao atualizar o profissional ${profissionalParaAtualizar?.nome ?? ""}!.`,
            type: "danger",
          });
      })
      .catch(() => {
        setAlert({
          message: `Houve um erro ao atualizar o profissional ${profissionalParaAtualizar?.nome ?? ""}!.`,
          type: "danger",
        });
      })
      .finally(() => {
        modal?.hide();
        handleProfissionalParaAtualizar(null);
        setCarregando(false);
      });
  };

  useEffect(() => {
    if (!modal && modalAtualizarRef.current) {
      setModal(new Modal(modalAtualizarRef.current, {}));
    }
    return () => {};
  }, []);
  useEffect(() => {
    const tipoDoc = especialidades.find((i) => i.id == especialidadeSelect);
    setTipoDocField(nomeTipoDocEspecialidadeEnum(tipoDoc?.tipoDocumento)); //
    return () => {};
  }, [especialidadeSelect]);

  useEffect(() => {
    if (profissionalParaAtualizar) {
      setValue("nome", profissionalParaAtualizar.nome);
      setValue("especialidadeId", profissionalParaAtualizar.especialidade.id);
      setValue("numeroDocumento", profissionalParaAtualizar.numeroDocumento);
      setEspecialidadeSelect(profissionalParaAtualizar.especialidade.id);
      modal?.show();
    } else modal?.hide();
    return () => {};
  }, [profissionalParaAtualizar]);

  return {
    carregandoEspec,
    carregando,
    atualizarProfisional,
    handleSubmit,
    registerForm,
    errorsForm,
    especialidades,
    setEspecialidadeSelect,
    tipoDocField,
    modalAtualizarRef,
    handleModal,
  };
};

export { useAtualizarProssionalViewModel };
