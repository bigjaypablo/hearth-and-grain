import { motion } from "framer-motion";

type Props = {
  label: string;
  active: boolean;
  onClick: () => void;
  group: string;
};

export default function Chip({ label, active, onClick, group }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="pill relative border border-line bg-cream px-4 py-2 text-sm font-medium"
    >
      {active && (
        <motion.span
          layoutId={`chip-${group}`}
          className="absolute inset-0 rounded-full bg-ink"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          active ? "text-cream" : "text-ink"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
