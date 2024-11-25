import { createBrowserRouter } from "react-router-dom";
import HomeView from "./home/HomeView";
import Layout from "./layout/Layout";
import ProfissionalView from "./profissional/ProfissionalView";
import { ProfissionalProvider } from "../providers/Profissional.context";

const routes = createBrowserRouter([
  {
    path: "",
    element: (
      <ProfissionalProvider>
        <Layout />
      </ProfissionalProvider>
    ),
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
