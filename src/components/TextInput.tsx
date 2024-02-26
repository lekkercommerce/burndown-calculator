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
      className={`border px-2 py-1 rounded-md text-black text-lg bg-slate-200 ${
        large ? "text-3xl w-full text-wrap text-center" : "text-right w-16"
      }`}
    />
  );
}
