import { createBrowserRouter } from "react-router-dom";
import HomeView from "./home/HomeView";
import Layout from "./layout/Layout";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
    ],
  },
]);

export { routes };
