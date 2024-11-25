import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { ProfissionalContext } from "../../../providers/Profissional.context";

const useExcluirProssionalViewModel = () => {
  const [carregando, setCarregando] = useState(false)

  const { profissionalParaExcluir } = useContext(ProfissionalContext);

  const modalExcluirRef = useRef(null);
  const [modal, setModal] = useState<Modal | null>(null);
  const handleModal = (close: boolean) => {
    if (!close) {
      modal!.show();
    } else {
      modal!.hide();
    }
  };

  useEffect(() => {
    if (modalExcluirRef.current) {
      setModal(new Modal(modalExcluirRef.current, {}));
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (profissionalParaExcluir) {
      modal?.show();
    }
    return () => {};
  }, [profissionalParaExcluir]);

  return {
    carregando,
    modalExcluirRef,
    handleModal,
    profissionalParaExcluir,
  };
};

export { useExcluirProssionalViewModel };
