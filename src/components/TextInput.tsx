import clsx from "clsx";

export default function TextInput({
  value,
  onChange,
  large,
}: {
  value: string;
  onChange: (value: string) => void;
  large?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(
        "border px-2 py-1 rounded-md bg-slate-900",
        large
          ? "text-3xl w-full text-wrap text-center font-semibold"
          : "text-lg text-right w-16"
      )}
    />
  );
}
