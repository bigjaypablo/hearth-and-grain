import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "dark" | "light" | "glass";
type Size = "md" | "sm";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

const base =
  "pill group gap-2 font-medium transition-colors duration-500 ease-soft disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-sm",
  sm: "px-4 py-2.5 text-[13px]",
};

const styles: Record<Variant, string> = {
  dark: "bg-ink text-cream hover:bg-sage",
  light: "bg-cream text-ink hover:bg-sand",
  glass: "border border-white/50 bg-white/25 text-cream backdrop-blur-md hover:bg-white/35",
};

export default function Button({
  children,
  variant = "dark",
  size = "md",
  icon,
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: Props) {
  const cls = `${base} ${sizes[size]} ${styles[variant]} ${className}`;
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
