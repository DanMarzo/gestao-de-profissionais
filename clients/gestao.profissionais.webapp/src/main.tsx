import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./presentation/router.tsx";
import { ToastContainer } from "react-toastify";
import { EspecialidadeProvider } from "./providers/Especialidade.context.tsx";
import "./main.scss";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "bootstrap";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <EspecialidadeProvider>
    <RouterProvider router={routes} />
    <ToastContainer />
  </EspecialidadeProvider>
);
