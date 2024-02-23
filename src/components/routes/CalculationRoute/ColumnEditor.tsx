import { useMemo, useState } from "react";
import { Column, ColumnType } from "../../../types";
import Button from "../../Button";
import { generateRandomString } from "../../../utils";
import useStore from "../../../store/useStore";

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
      <div className="border p-4">
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
        <div className="mt-4">
          <Button onClick={addColumn}>add column</Button>
        </div>
      </div>
    </div>
  );
}

export default function ColumnEditor() {
  const { store, setStore } = useStore();
  const [columns, setColumns] = useState<Column[]>(
    store.columns || [
      {
        id: generateRandomString(),
        name: "To Do",
        type: ColumnType.Todo,
      },
      {
        id: generateRandomString(),
        name: "In Progress",
        type: ColumnType.InProgress,
      },
      {
        id: generateRandomString(),
        name: "Done",
        type: ColumnType.Done,
      },
    ]
  );
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
    setStore((store) => ({
      ...store,
      view: store.scenarios ? "result" : "scenarios",
      columns,
    }));
  }

  return (
    <>
      <div>Columns</div>
      <div>
        <ColumnList
          title="Not started yet"
          columns={todoColumns}
          addColumn={() => addColumn(ColumnType.Todo)}
          updateColumn={updateColumn}
        />
        <ColumnList
          title="On going"
          columns={inProgressColumns}
          addColumn={() => addColumn(ColumnType.InProgress)}
          updateColumn={updateColumn}
        />
        <ColumnList
          title="Has been completed"
          columns={doneColumns}
          addColumn={() => addColumn(ColumnType.Done)}
          updateColumn={updateColumn}
        />
        <Button onClick={onSave}>Save</Button>
      </div>
    </>
  );
}
