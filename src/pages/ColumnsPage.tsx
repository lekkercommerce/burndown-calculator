import { useMemo, useState } from "react";
import { Column, ColumnType } from "../types";
import Button from "../components/Button";
import { generateRandomString } from "../utils";

function ColumnList({
  title,
  columns,
  addColumn,
  updateColumn,
}: {
  title: string;
  columns: Column[];
  addColumn: () => void;
  updateColumn: (column: Column) => void;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl">{title}</h2>
      <div className="border">
        {columns.map((column) => (
          <div key={column.id}>
            <input
              className="border"
              value={column.name}
              onChange={(e) =>
                updateColumn({ ...column, name: e.target.value })
              }
            />
          </div>
        ))}
        <Button onClick={addColumn}>add column</Button>
      </div>
    </div>
  );
}

export default function ColumnsPage({
  columns: initialColumns,
  setColumns: saveColumns,
}: {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const { todoColumns, inProgressColumns, doneColumns } = useMemo(
    () => ({
      todoColumns: columns.filter((column) => column.type === ColumnType.Todo),
      inProgressColumns: columns.filter(
        (column) => column.type === ColumnType.InProgress
      ),
      doneColumns: columns.filter((column) => column.type === ColumnType.Done),
    }),
    [columns]
  );

  function addColumn(type: ColumnType) {
    const id = Date.now() + generateRandomString(4);
    setColumns([...columns, { id, name: "", type }]);
  }
  function updateColumn(updatedColumn: Column) {
    setColumns([
      ...columns.filter((c) => c.id !== updatedColumn.id),
      updatedColumn,
    ]);
  }
  function onSave() {
    saveColumns(columns);
  }
  return (
    <div className="p-8">
      <div>Columns</div>
      <div>
        <ColumnList
          title="Todo"
          columns={todoColumns}
          addColumn={() => addColumn(ColumnType.Todo)}
          updateColumn={updateColumn}
        />
        <ColumnList
          title="In Progress"
          columns={inProgressColumns}
          addColumn={() => addColumn(ColumnType.InProgress)}
          updateColumn={updateColumn}
        />
        <ColumnList
          title="Done"
          columns={doneColumns}
          addColumn={() => addColumn(ColumnType.Done)}
          updateColumn={updateColumn}
        />
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}
