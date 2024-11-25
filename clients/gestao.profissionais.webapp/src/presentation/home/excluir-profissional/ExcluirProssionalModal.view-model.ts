import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { ProfissionalContext } from "../../../providers/Profissional.context";
import { excluirProfissionalService } from "../../../infra/services/excluir-profissional.service";
import { toast } from "react-toastify";

const useExcluirProssionalViewModel = () => {
  const {
    profissionalParaExcluir,
    handleProfissionalParaExcluir,
    obterProfissionais,
  } = useContext(ProfissionalContext);

  const modalExcluirRef = useRef(null);
  const [modal, setModal] = useState<Modal | null>(null);
  const handleModal = (close: boolean) => {
    if (!close) {
      modal!.show();
    } else {
      modal!.hide();
    }
  };
  const [carregando, setCarregando] = useState(false);
  const excluirProfissional = () => {
    setCarregando(true);
    excluirProfissionalService(profissionalParaExcluir!.id!)
      .then((res) => {
        if (res) {
          toast(`${profissionalParaExcluir?.nome} excluído com sucesso!`, {
            type: "success",
          });
          obterProfissionais();
        } else
          toast("Não foi possível excluir o profissional", {
            type: "warning",
          });
      })
      .catch(() => {
        toast("Não foi possível excluir o profissional", { type: "error" });
      })
      .finally(() => {
        modal?.hide();
        handleProfissionalParaExcluir(null);
        setCarregando(false);
      });
  };
  useEffect(() => {
    if (modalExcluirRef.current) {
      setModal(new Modal(modalExcluirRef.current, {}));
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (profissionalParaExcluir) modal?.show();
    else modal?.hide();
    return () => {};
  }, [profissionalParaExcluir]);

  return {
    carregando,
    modalExcluirRef,
    handleModal,
    profissionalParaExcluir,
    excluirProfissional,
  };
};

export { useExcluirProssionalViewModel };
