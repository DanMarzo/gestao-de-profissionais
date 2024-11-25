import { nomeTipoDocEspecialidadeEnum } from "../../../models/especialidade.model";
import { ProfissionalModel } from "../../../models/profissional.model";
import { useExcluirProssionalViewModel } from "./ExcluirProssionalModal.view-model";

type Props = {
  profissional: ProfissionalModel;
};

const ExcluirProfissionalModal = () => {
  //Carregar especialidades ao iniciar
  const { handleModal, modalExcluirRef } =
    useExcluirProssionalViewModel(profissional);

  return (
    <>
      <button onClick={() => handleModal(false)} className="dropdown-item">
        Excluir
      </button>
      {/* Modal */}
      <div
        ref={modalExcluirRef}
        className="modal fade"
        id={`atualizarProfissionalModal${profissional.id}`}
        tabIndex={-1}
        aria-labelledby={`atualizarProfissionalModalLabel${profissional.id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content needs-validation">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`atualizarProfissionalModalLabel${profissional.id}`}
              >
                Excluir Profissional
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja excluir o profissional {profissional.nome}{" "}
              (
              {`${nomeTipoDocEspecialidadeEnum(
                profissional.especialidade.tipoDocumento
              )} ${profissional.numeroDocumento}`}
              ? )? Essa ação não poderá ser desfeita!
            </div>
            <div className="modal-footer">
              <button
                type="reset"
                className="btn text-white bg-tertiary"
                onClick={() => handleModal(true)}
              >
                Cancelar
              </button>
              <button className="btn btn-danger">Sim, excluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ExcluirProfissionalModal };
