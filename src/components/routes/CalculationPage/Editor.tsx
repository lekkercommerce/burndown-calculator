import { useCallback, useEffect, useState } from "react";
import Button from "../../Button";
import useStore from "../../../store/useStore";
import { parseNumber } from "../../../parser";
import TextInput from "../../TextInput";

export default function Editor({
  formDirty,
  setFormDirty,
  hasSprintData,
}: {
  formDirty: boolean;
  setFormDirty: (isDirty: boolean) => void;
  hasSprintData: boolean;
}) {
  const { store, setStore } = useStore();
  const [name, setName] = useState(store.name || "Sprint title");
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
  const [completionTarget, setCompletionTarget] = useState<string>(
    store.completionTarget?.toString() || "80"
  );

  const discardChanges = useCallback(() => {
    if (store) {
      setName(store.name || "");
      setTotalDays(store.totalDays?.toString() || "");
      setRemainingDays(store.remainingDays?.toString() || "");
      setCompletedItems(store.completedItems?.toString() || "");
      setTotalItems(store.totalItems?.toString() || "");
      setCompletionTarget(store.completionTarget?.toString() || "");
    }
  }, [store]);

  const parseStateForStore = useCallback(
    () => ({
      name,
      remainingDays: parseNumber(remainingDays),
      totalDays: parseNumber(totalDays),
      completedItems: parseNumber(completedItems),
      totalItems: parseNumber(totalItems),
      completionTarget: parseNumber(completionTarget),
    }),
    [
      name,
      remainingDays,
      totalDays,
      completedItems,
      totalItems,
      completionTarget,
    ]
  );

  useEffect(() => {
    setFormDirty(
      JSON.stringify(parseStateForStore()) !== JSON.stringify(store)
    );
  }, [store, parseStateForStore, setFormDirty]);

  function onSave() {
    // TODO: validate with react hook form
    const updatedStore = parseStateForStore();
    setStore(() => updatedStore);
  }

  return (
    <div className="flex flex-col items-center px-2 md:px-8 py-8 border border-slate-500 rounded-md">
      <div className="mb-6">
        <a href="/calc" className="mr-4">
          <Button>RESET</Button>
        </a>
        <TextInput value={name || ""} onChange={setName} large />
      </div>
      <table className="editor">
        <tbody>
          <tr>
            <th>Completed items</th>
            <td>
              <TextInput
                value={completedItems}
                onChange={(value) => setCompletedItems(trimNumber(value))}
              />
            </td>
          </tr>
          <tr>
            <th>Total items</th>
            <td>
              <TextInput
                value={totalItems}
                onChange={(value) => setTotalItems(trimNumber(value))}
              />
            </td>
          </tr>
          <tr>
            <th>Days left</th>
            <td>
              <TextInput
                value={remainingDays}
                onChange={(value) => setRemainingDays(trimNumber(value))}
              />
            </td>
          </tr>
          <tr>
            <th>Total days</th>
            <td>
              <TextInput
                value={totalDays}
                onChange={(value) => setTotalDays(trimNumber(value))}
              />
            </td>
          </tr>
          <tr>
            <th>Target %</th>
            <td>
              <TextInput
                value={completionTarget}
                onChange={(value) => setCompletionTarget(trimNumber(value))}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {formDirty && (
        <div className="flex space-x-4 mt-8">
          {hasSprintData && <Button onClick={discardChanges}>Cancel</Button>}
          <Button variant="primary" onClick={onSave}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

function trimNumber(value: string) {
  return value;
  // TODO: remove text input validation
}
