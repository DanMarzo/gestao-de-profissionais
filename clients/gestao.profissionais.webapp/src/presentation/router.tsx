import { createBrowserRouter } from "react-router-dom";
import HomeView from "./home/HomeView";
import Layout from "./layout/Layout";
import ProfissionalView from "./profissional/ProfissionalView";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: ":profissionalId",
        element: <ProfissionalView />,
      },
    ],
  },
]);

export { routes };
