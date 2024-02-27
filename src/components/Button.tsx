import clsx from "clsx";

export default function Button({
  children,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "border rounded-md py-1 px-4",
        variant === "primary" && "bg-blue-800"
      )}
    >
      {children}
    </button>
  );
}
