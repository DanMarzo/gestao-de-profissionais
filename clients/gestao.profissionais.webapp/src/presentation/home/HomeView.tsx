import { lazy, Suspense } from "react";
import { HomeViewViewModel } from "./HomeView.view-model";

const TableProfissionais = lazy(
  () => import("./components/TableListProfissionais.component")
);

const RegistrarProfissionalModal = lazy(
  () => import("./registrar-profissional/RegistrarProfissionalModal")
);

const HomeView = () => {
  const {
    profissionais,
    nextPage,
    previousPage,
    especialidades,
    especialidadeSelecionada,
    handleSetEspecialidade,
    setSearchParams,
  } = HomeViewViewModel();

  return (
    <Suspense>
      <main role="main" className="container-fluid p-4 overflow-auto h-100">
        <div className="row mb-4">
          <div className="col-6 p-0">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-primary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filtrar por Especialidade:{" "}
                {`${especialidadeSelecionada?.nome ?? "Todas"}`}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <h6 className="dropdown-header">FILTRAR POR:</h6>
                </li>

                <li>
                  <button
                    onClick={() => handleSetEspecialidade(null)}
                    className="dropdown-item"
                  >
                    Todas
                  </button>
                </li>
                {especialidades.map((item, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={() => handleSetEspecialidade(item)}
                        className="dropdown-item"
                      >
                        {item.nome}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end p-0">
            <RegistrarProfissionalModal />
          </div>
        </div>
        <div className="row mb-4">
          <TableProfissionais />
        </div>
        <div className="row">
          <nav
            className="col-12 p-0 d-flex justify-content-center"
            aria-label="Navegar entre os itens"
          >
            {profissionais?.error ? (
              <></>
            ) : (
              <nav aria-label="Navegacao entre paginas de profissionais">
                {!profissionais?.nroPaginas ? (
                  <h4 className="text-primary">
                    Nenhum profissional localizado
                  </h4>
                ) : (
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        onClick={() => previousPage()}
                        className="page-link"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>

                    {Array.from({
                      length: profissionais?.nroPaginas ?? 1,
                    }).map((_, index) => {
                      return (
                        <li
                          key={index}
                          className={`${
                            profissionais?.indice == index + 1
                              ? "page-item active"
                              : "page-item"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setSearchParams((values) => {
                                return {
                                  ...values,
                                  indice: (index + 1).toString(),
                                };
                              })
                            }
                            className="page-link"
                          >
                            {index + 1}
                          </button>
                        </li>
                      );
                    })}

                    <li className="page-item">
                      <button
                        onClick={() => nextPage()}
                        className="page-link"
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                )}
              </nav>
            )}
          </nav>
        </div>
      </main>
    </Suspense>
  );
};

export default HomeView;
