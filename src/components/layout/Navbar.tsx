import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import type { Variants } from "framer-motion";
import { site } from "../../data/site";
import { nav, navCta } from "../../data/nav";
import { EASE, staggerContainer } from "../../lib/motion";
import Button from "../ui/Button";
import { ArrowRight, CloseIcon, MenuIcon } from "../ui/Icons";

const MotionLink = motion.create(Link);

const linkVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

export default function Navbar() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const activeTo = nav.find((n) =>
    n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)
  )?.to;

  // Home has a dark hero behind the nav. Every other page is cream, so the nav stays solid.
  const solid = scrolled || open || pathname !== "/";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
        <motion.nav
          aria-label="Main"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0, scale: scrolled ? 0.97 : 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`relative flex w-full max-w-[1080px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-colors duration-500 ${
            solid ? "text-ink" : "text-cream"
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 -z-10 rounded-full backdrop-blur-xl transition-all duration-500 ${
              solid ? "bg-cream/85 shadow-soft" : "border border-white/20 bg-ink/20"
            }`}
          />

          <Link to="/" className="flex items-center gap-2 font-serif text-lg tracking-display">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-sage text-xs text-cream">
              H
            </span>
            {site.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const isActive = activeTo === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={isActive ? "page" : undefined}
                    className="relative block rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className={`absolute inset-0 rounded-full ${
                          solid ? "bg-ink" : "bg-cream"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? (solid ? "text-cream" : "text-ink") : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              href={navCta.href}
              variant={solid ? "dark" : "light"}
              icon={<ArrowRight />}
              className="hidden md:inline-flex"
            >
              {navCta.label}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full md:hidden"
            >
              {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-cream px-8 text-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer(0.08, 0.15)}
              className="space-y-1"
            >
              {nav.map((item) => (
                <li key={item.to} className="overflow-hidden">
                  <MotionLink
                    variants={linkVariants}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    aria-current={activeTo === item.to ? "page" : undefined}
                    className={`block font-serif text-5xl tracking-display ${
                      activeTo === item.to ? "text-sage" : ""
                    }`}
                  >
                    {item.label}
                  </MotionLink>
                </li>
              ))}
            </motion.ul>

            <div className="mt-10">
              <Button href={navCta.href} icon={<ArrowRight />} onClick={() => setOpen(false)}>
                {navCta.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
