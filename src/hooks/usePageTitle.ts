import { useEffect } from "react";

export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title
      ? `${title} | Hearth & Grain`
      : "Hearth & Grain | Interior Design Studio";
  }, [title]);
}
