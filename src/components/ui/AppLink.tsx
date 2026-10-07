import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

/** Router link for internal paths, plain anchor for mailto, tel and external URLs. */
export default function AppLink({ href, children, className, onClick }: Props) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
