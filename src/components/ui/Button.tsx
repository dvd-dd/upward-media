import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2";

  const variants = {
    primary: "gradient-primary text-background hover:opacity-90",
    secondary: "gradient-accent text-white hover:opacity-90",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-background",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
