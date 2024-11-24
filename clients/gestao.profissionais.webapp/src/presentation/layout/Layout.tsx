import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="container bg-primary">
        <nav className="navbar navbar-expand-lg bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">
              Gestão de Profissionais
            </a>
            <i className="bi bi-people-fill text-white"></i>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
