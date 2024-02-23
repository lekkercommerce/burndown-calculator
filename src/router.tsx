import { createBrowserRouter } from "react-router-dom";
import CalculationRoute from "./components/routes/CalculationRoute";

export default createBrowserRouter([
  {
    path: "/",
    element: <CalculationRoute />,
  },
]);
