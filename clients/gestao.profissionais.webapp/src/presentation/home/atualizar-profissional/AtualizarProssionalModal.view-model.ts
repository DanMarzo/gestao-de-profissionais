import { useContext, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { toast } from "react-toastify";
import { EspecialidadeContext } from "../../../providers/Especialidade.context";
import { Modal } from "bootstrap";
import { ProfissionalContext } from "../../../providers/Profissional.context";
import { atualizarProfissionalService } from "../../../infra/services/atualizar-profissional.service";

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

const useAtualizarProssionalViewModel = () => {
  const {
    register: registerForm,
    handleSubmit,
    setValue,
    formState: { errors: errorsForm },
  } = useForm({ resolver: yupResolver(formValidationSchema) });
  const { carregando: carregandoEspec, especialidades } =
    useContext(EspecialidadeContext);
  const {
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
          toast(`${res.data?.nome} atualizado com sucesso!`, {
            type: "success",
          });
          obterProfissionais();
        } else
          toast("Não foi possível atualizar o profissional", {
            type: "warning",
          });
      })
      .catch(() => {
        toast("Não foi possível atualizar o profissional", { type: "error" });
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
