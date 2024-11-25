import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { ProfissionalModel } from "../../../models/profissional.model";

const useExcluirProssionalViewModel = () => {
  const [loadingRegistro, setLoadingRegistro] = useState(false);

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

  return {
    loadingRegistro,
    modalExcluirRef,
    handleModal,
  };
};

export { useExcluirProssionalViewModel };
