export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="border rounded-md py-1 px-4">
      {children}
    </button>
  );
}
