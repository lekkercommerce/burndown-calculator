import { useCallback, useEffect, useState } from "react";
import Button from "../../Button";
import useStore from "../../../store/useStore";
import { parseNumber } from "../../../parser";

export default function Editor({
  formDirty,
  setFormDirty,
}: {
  formDirty: boolean;
  setFormDirty: (isDirty: boolean) => void;
}) {
  const { store, setStore } = useStore();
  const [name, setName] = useState(store.name || "New ");
  const [totalDays, setTotalDays] = useState<string>(
    store.totalDays?.toString() || ""
  );
  const [remainingDays, setRemainingDays] = useState<string>(
    store.remainingDays?.toString() || ""
  );
  const [completedItems, setCompletedItems] = useState<string>(
    store.completedItems?.toString() || ""
  );
  const [totalItems, setTotalItems] = useState<string>(
    store.totalItems?.toString() || ""
  );

  const parseStateForStore = useCallback(
    () => ({
      name,
      remainingDays: parseNumber(remainingDays),
      totalDays: parseNumber(totalDays),
      completedItems: parseNumber(completedItems),
      totalItems: parseNumber(totalItems),
    }),
    [name, remainingDays, totalDays, completedItems, totalItems]
  );

  useEffect(() => {
    setFormDirty(
      JSON.stringify(parseStateForStore()) !== JSON.stringify(store)
    );
  }, [store, parseStateForStore, setFormDirty]);

  function onSave() {
    // TODO: validate with react hook form
    setStore(() => parseStateForStore());
  }

  return (
    <div className="p-8">
      <div className=" mx-4 mb-4">
        <a href="/calc" className="mr-4">
          <Button>RESET</Button>
        </a>
        <input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 text-2xl"
        />
      </div>
      <table className="editor">
        <tbody>
          <tr>
            <th>Days left</th>
            <td>
              <input
                value={remainingDays}
                onChange={(e) => setRemainingDays(trimNumber(e.target.value))}
                className="border p-1"
              />
            </td>
          </tr>
          <tr>
            <th>Total days</th>
            <td>
              <input
                value={totalDays}
                onChange={(e) => setTotalDays(trimNumber(e.target.value))}
                className="border p-1"
              />
            </td>
          </tr>
          <tr>
            <th>Completed items</th>
            <td>
              <input
                value={completedItems}
                onChange={(e) => setCompletedItems(trimNumber(e.target.value))}
                className="border p-1"
              />
            </td>
          </tr>
          <tr>
            <th>Total items</th>
            <td>
              <input
                value={totalItems}
                onChange={(e) => setTotalItems(trimNumber(e.target.value))}
                className="border p-1"
              />
            </td>
          </tr>
        </tbody>
      </table>
      {formDirty && <Button onClick={onSave}>Save</Button>}
    </div>
  );
}

function trimNumber(value: string) {
  return value;
  // TODO: remove text input validation
}
