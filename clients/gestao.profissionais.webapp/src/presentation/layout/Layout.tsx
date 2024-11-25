import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav className="navbar bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="#">
              Gestão de Profissionais
            </a>
            <i className="bi bi-people-fill text-white"></i>
          </div>
        </nav>
      </header>
      <div className="layoutApp">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
