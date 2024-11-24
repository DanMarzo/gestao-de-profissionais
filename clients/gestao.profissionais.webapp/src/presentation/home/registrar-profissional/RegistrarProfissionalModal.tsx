import { useRegistrarProssionalViewModel } from "./RegistrarProssionalModal.view-model";

//type Props = {};

const RegistrarProfissionalModal = () => {
  //Carregar especialidades ao iniciar
  const { loading } = useRegistrarProssionalViewModel();
  return (
    <>
      <button
        className="btn btn-primary d-flex gap-2"
        data-bs-toggle="modal"
        data-bs-target="#registrarProfissionalModal"
      >
        Adicionar
        <i className="bi bi-plus-lg"></i>
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="registrarProfissionalModal"
        tabIndex={-1}
        aria-labelledby="registrarProfissionalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="registrarProfissionalModalLabel"
              >
                Adicionar profissional
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="reset"
                className="btn text-white bg-tertiary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrarProfissionalModal;
