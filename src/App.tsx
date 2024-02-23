import { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import ColumnsPage from "./pages/ColumnsPage";
import { AppPage, Column } from "./types";

function App() {
  const [page, setPage] = useState<AppPage>("welcome");
  const [columns, setColumns] = useState<Column[]>([]);
  return (
    <div>
      {page === "columns" && (
        <ColumnsPage columns={columns || []} setColumns={setColumns} />
      )}
      {page === "welcome" && <WelcomePage setPage={setPage} />}
    </div>
  );
}

export default App;
