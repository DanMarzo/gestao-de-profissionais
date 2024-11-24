import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./presentation/router.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
