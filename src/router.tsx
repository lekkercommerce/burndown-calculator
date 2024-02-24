import { createBrowserRouter } from "react-router-dom";
import CalculationPage from "./components/routes/CalculationPage";
import WelcomePage from "./components/routes/WelcomePage";

export default createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/calc",
    element: <CalculationPage />,
  },
]);
