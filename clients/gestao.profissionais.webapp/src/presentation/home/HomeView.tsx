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
      <div className="row bg-primary">linha indices da tabela</div>
    </main>
  );
};

export default HomeView;
