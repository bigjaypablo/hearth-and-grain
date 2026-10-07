import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "dark" | "light" | "glass";

type Props = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

const base =
  "pill group gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-500 ease-soft disabled:opacity-60";

const styles: Record<Variant, string> = {
  dark: "bg-ink text-cream hover:bg-sage",
  light: "bg-cream text-ink hover:bg-sand",
  glass: "border border-white/30 bg-white/15 text-cream backdrop-blur-md hover:bg-white/25",
};

export default function Button({
  children,
  variant = "dark",
  icon,
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-500 ease-soft group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href && href.startsWith("/")) {
    return (
      <Link to={href} onClick={onClick} className={cls}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
