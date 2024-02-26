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
      className={`border p-1 rounded-md  text-lg ${
        large ? "text-3xl w-full text-wrap text-center" : "text-right w-16"
      }`}
    />
  );
}
