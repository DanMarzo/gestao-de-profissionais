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
    listProfissionais,
    setSearchParams,
    nextPage,
    previousPage,
    especialidades,
  } = HomeViewViewModel();
  return (
    <Suspense>
      <main role="main" className="container-fluid p-4 gu">
        <div className="row mb-4">
          <div className="col-6 p-0">
            <button className="btn btn-secondary text-primary">
              Filtrar por: (tipo)
            </button>
          </div>
          <div className="col-6 d-flex justify-content-end p-0">
            <RegistrarProfissionalModal />
          </div>
        </div>
        <div className="row mb-4">
          <TableProfissionais profissionais={listProfissionais?.data ?? []} />
        </div>
        <div className="row">
          <nav
            className="col-12 p-0 d-flex justify-content-center"
            aria-label="Navegar entre os itens"
          >
            {listProfissionais?.error ? (
              <></>
            ) : (
              <nav aria-label="Page navigation example">
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
                  {/* Listagem */}
                  {Array.from({
                    length: listProfissionais?.nroPaginas ?? 1,
                  }).map((_, index) => {
                    return (
                      <li
                        key={index}
                        className={`${
                          listProfissionais?.indice == index + 1
                            ? "page-item active"
                            : "page-item"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setSearchParams({ indice: (index + 1).toString() })
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
              </nav>
            )}
          </nav>
        </div>
      </main>
    </Suspense>
  );
};

export default HomeView;
