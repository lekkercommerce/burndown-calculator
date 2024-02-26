import { useCallback, useEffect, useState } from "react";
import Button from "../../Button";
import useStore from "../../../store/useStore";
import { parseNumber } from "../../../parser";
import TextInput from "../../TextInput";

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
    const updatedStore = parseStateForStore();
    console.log({ updatedStore });
    setStore(() => updatedStore);
  }

  return (
    <div className="p-8 border flex flex-col items-center">
      <div className="mx-4 mb-4">
        <a href="/calc" className="mr-4">
          <Button>RESET</Button>
        </a>
        <TextInput value={name || ""} onChange={setName} large />
      </div>
      <table className="editor mb-8">
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
