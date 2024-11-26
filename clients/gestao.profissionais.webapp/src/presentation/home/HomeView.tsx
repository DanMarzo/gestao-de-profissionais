import { lazy, Suspense } from "react";
import { HomeViewViewModel } from "./HomeView.view-model";
import Carregando from "../../shared/components/Carregando.component";
import Alert from "../../shared/components/Alert.component";
import { LoadingOutlined } from "@ant-design/icons";

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
    carregandoEsp,
    especialidadeSelecionada,
    handleSetEspecialidade,
    setSearchParams,
    carregando,
  } = HomeViewViewModel();

  return (
    <Suspense fallback={<LoadingOutlined />}>
      <main role="main" className="container-fluid p-4 overflow-auto h-100">
        <div className="row mb-4 justify-content-between g-2">
          <div className="col-xs-12 col-md-4 col-lg-3 col-xl-2 p-0  justify-content-center justify-content-sm-start">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle text-primary w-100"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filtrar por Especialidade:
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
                <Carregando carregando={carregandoEsp}>
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
                </Carregando>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 d-flex justify-content-center p-0">
            <Alert />
          </div>
          <div className="col-md-2 col-xl-1 d-flex justify-content-center col-12 justify-content-sm-end p-0">
            <div className="w-100">
              <RegistrarProfissionalModal />
            </div>
          </div>
        </div>
        <Carregando carregando={carregando}>
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
                      <li className="page-item me-1">
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
                            } me-1`}
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
        </Carregando>
      </main>
    </Suspense>
  );
};

export default HomeView;
