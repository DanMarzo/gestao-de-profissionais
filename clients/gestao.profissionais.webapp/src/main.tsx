import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./presentation/router.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./main.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { EspecialidadeProvider } from "./providers/Especialidade.context.tsx";

createRoot(document.getElementById("root")!).render(
  <EspecialidadeProvider>
    <RouterProvider router={routes} />
    <ToastContainer />
  </EspecialidadeProvider>
);
