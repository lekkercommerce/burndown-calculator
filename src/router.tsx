import { createBrowserRouter } from "react-router-dom";
import CalculationPage from "./components/routes/CalculationPage";
import WelcomePage from "./components/routes/WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/calc",
    element: <CalculationPage />,
  },
]);

export default router;
