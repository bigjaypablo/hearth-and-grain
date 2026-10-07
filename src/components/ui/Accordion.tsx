import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../../lib/motion";
import { PlusIcon } from "./Icons";

export type AccordionItem = { q: string; a: string };

type Props = { items: readonly AccordionItem[] };

export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3 className="font-sans">
              <button
                type="button"
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl tracking-display sm:text-2xl"
              >
                <span>{item.q}</span>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-soft ${
                    isOpen ? "rotate-45 border-ink bg-ink text-cream" : "border-line"
                  }`}
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
