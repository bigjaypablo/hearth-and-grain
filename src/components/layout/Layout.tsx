import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { scrollToTop } from "./SmoothScroll";
import { EASE } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Layout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const reduced = useReducedMotion();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar />

      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop(true)}>
        <motion.main
          key={pathname}
          id="main"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <Suspense fallback={<div className="min-h-[70vh]" />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
