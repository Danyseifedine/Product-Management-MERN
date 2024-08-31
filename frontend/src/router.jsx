import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homePage";
import CreateProduct from "./pages/CreateProduct";
import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create-product",
    element: <CreateProduct />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;
