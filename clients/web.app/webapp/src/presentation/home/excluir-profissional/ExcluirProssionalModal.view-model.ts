import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { ProfissionalContext } from "../../../providers/Profissional.context";
import { excluirProfissionalService } from "../../../infra/services/excluir-profissional.service";

const useExcluirProssionalViewModel = () => {
  const {
    profissionalParaExcluir,
    handleProfissionalParaExcluir,
    obterProfissionais,
    setAlert,
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
          setAlert({
            message: `Profissional ${profissionalParaExcluir?.nome} excluído com sucesso!`,
            type: "success",
          });
          obterProfissionais();
        } else
          setAlert({
            message: `Houve um erro ao excluir o profissional ${
              profissionalParaExcluir?.nome ?? ""
            }!.`,
            type: "danger",
          });
      })
      .catch(() => {
        setAlert({
          message: `Houve um erro ao excluir o profissional ${
              profissionalParaExcluir?.nome ?? ""
            }!.`,
          type: "danger",
        });
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
