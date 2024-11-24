import { lazy, Suspense } from "react";
const TableProfissionais = lazy(
  () => import("./components/TableListProfissionais.component")
);

const HomeView = () => {
  return (
    <main role="main" className="container-fluid p-4 gu">
      <div className="row mb-4">
        <div className="col-6 p-0">
          <button className="btn btn-secondary text-primary">
            Filtrar por: (tipo)
          </button>
        </div>
        <div className="col-6 d-flex justify-content-end p-0">
          <button className="btn btn-primary d-flex gap-2">
            Adicionar
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
      <div className="row mb-4">
        <Suspense>
          <TableProfissionais profissionais={[]} />
        </Suspense>
      </div>
      <div className="row">
        <nav
          className="col-12 p-0 d-flex justify-content-center"
          aria-label="Navegar entre os itens"
        >
          <ul className="pagination">
            <li className="page-item ">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default HomeView;
