import { useAtualizarProssionalViewModel } from "./AtualizarProssionalModal.view-model";
import { LoadingOutlined } from "@ant-design/icons";

const AtualizarProfissionalModal = () => {
  //Carregar especialidades ao iniciar
  const {
    tipoDocField,
    errorsForm,
    handleSubmit,
    registerForm,
    especialidades,
    setEspecialidadeSelect,
    registrarProfissional,
    carregandoEspec,
    handleModal,
    // loadingRegistro,
    modalRef,
  } = useAtualizarProssionalViewModel();

  return (
    <>
      {/* Modal */}
      <div
        ref={modalRef}
        className="modal fade"
        id="atualizarProfissionalModal"
        tabIndex={-1}
        aria-labelledby="atualizarProfissionalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <form
            onSubmit={handleSubmit(registrarProfissional)}
            className="modal-content needs-validation"
          >
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="atualizarProfissionalModalLabel"
              >
                Atualizar profissional
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="nomeProfissionalForm" className="form-label">
                  Nome do Profissional
                </label>
                <input
                  {...registerForm("nome")}
                  type="text"
                  className="form-control"
                  id="nomeProfissionalForm"
                />
                {errorsForm.nome?.message && (
                  <div className="text-danger">{errorsForm.nome?.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="especialidadeForm" className="form-label">
                  Selecionar especialidade
                </label>
                <select
                  {...registerForm("especialidadeId", { required: true })}
                  id="especialidadeForm"
                  className="form-select"
                  aria-label="Selecionar especialidade"
                  required
                  onChange={(item) => {
                    if (item.target.value) {
                      setEspecialidadeSelect(
                        Number.parseInt(item.target.value)
                      );
                    }
                  }}
                >
                  <option value={""}></option>
                  {especialidades.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.nome}
                      </option>
                    );
                  })}
                </select>

                {errorsForm.especialidadeId?.message && (
                  <div className="text-danger">
                    {errorsForm.especialidadeId?.message}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="tipoDocumentoForm" className="form-label">
                  Tipo documento
                </label>
                <input
                  readOnly
                  value={`${tipoDocField?.toString() ?? ""}`}
                  type="text"
                  className="form-control"
                  id="tipoDocumentoForm"
                />
              </div>
              <div>
                <label htmlFor="nroDocumentoForm" className="form-label">
                  Número do documento
                </label>
                <input
                  {...registerForm("numeroDocumento")}
                  type="text"
                  className="form-control"
                  id="nroDocumentoForm"
                />
                {errorsForm.numeroDocumento?.message && (
                  <div className="text-danger">
                    {errorsForm.numeroDocumento?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="reset"
                className="btn text-white bg-tertiary"
                onClick={() => handleModal(true)}
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

export default AtualizarProfissionalModal;
