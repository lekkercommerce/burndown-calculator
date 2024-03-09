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
  const [completedPoints, setCompletedPoints] = useState<string>(
    store.completedPoints?.toString() || ""
  );
  const [totalPoints, setTotalPoints] = useState<string>(
    store.totalPoints?.toString() || ""
  );
  const [completionTarget, setCompletionTarget] = useState<string>(
    store.completionTarget?.toString() || "80"
  );
  const [isConfirmingDiscard, setIsConfirmingDiscard] = useState(false);

  const discardChanges = useCallback(() => {
    if (store) {
      setName(store.name || "");
      setTotalDays(store.totalDays?.toString() || "");
      setRemainingDays(store.remainingDays?.toString() || "");
      setCompletedPoints(store.completedPoints?.toString() || "");
      setTotalPoints(store.totalPoints?.toString() || "");
      setCompletionTarget(store.completionTarget?.toString() || "");
    }
  }, [store]);

  const parseStateForStore = useCallback(
    () => ({
      name,
      remainingDays: parseNumber(remainingDays),
      totalDays: parseNumber(totalDays),
      completedPoints: parseNumber(completedPoints),
      totalPoints: parseNumber(totalPoints),
      completionTarget: parseNumber(completionTarget),
    }),
    [
      name,
      remainingDays,
      totalDays,
      completedPoints,
      totalPoints,
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

  if (isConfirmingDiscard) {
    return (
      <div className="flex flex-col items-center py-10 border border-slate-500 rounded-md">
        <div className="mb-4">Are you sure you want to reset?</div>
        <div className="flex justify-center space-x-4">
          <a href="/calc">
            <Button onClick={discardChanges}>Yes</Button>
          </a>
          <Button onClick={() => setIsConfirmingDiscard(false)}>No</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-2 md:px-8 py-8 border border-slate-500 rounded-md">
      <button
        className="mr-4 absolute right-0 -mt-6"
        onClick={() => setIsConfirmingDiscard(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-circle-x"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </button>

      <div className="mb-6">
        <TextInput value={name || ""} onChange={setName} large />
      </div>
      <table className="editor">
        <tbody>
          <tr>
            <th>Completed points</th>
            <td>
              <TextInput
                value={completedPoints}
                onChange={(value) => setCompletedPoints(trimNumber(value))}
              />
            </td>
          </tr>
          <tr>
            <th>Total points</th>
            <td>
              <TextInput
                value={totalPoints}
                onChange={(value) => setTotalPoints(trimNumber(value))}
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
