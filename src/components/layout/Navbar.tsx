import { useEffect, useRef, useState } from "react";
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
  const [scrollingUp, setScrollingUp] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const [brandA, brandB] = site.name.split(" & ");

  const lastY = useRef(0);
  const travel = useRef(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    const diff = v - lastY.current;
    lastY.current = v;
    setScrolled(v > 24);

    if (v <= 24) {
      travel.current = 0;
      setScrollingUp(false);
      return;
    }
    if (diff === 0) return;

    // Reset the running total whenever the scroll direction flips.
    if (diff > 0 !== travel.current > 0) travel.current = 0;
    travel.current += diff;

    if (travel.current < -10) setScrollingUp(true);
    else if (travel.current > 10) setScrollingUp(false);
  });

  useEffect(() => {
    setOpen(false);
    setScrolled(window.scrollY > 24);
    setScrollingUp(false);
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

  // floating = detached pill. At the very top the nav sits flat on the page.
  const floating = scrolled;
  // Cream text only while flat on the dark home hero. Everything else uses dark text.
  const onLight = scrolled || open || !isHome;
  // Mobile: menu icon at the top and when scrolling up, CTA while scrolling down.
  // For the strict version (CTA always replaces the menu while floating), use: !floating || open
  const menuVisible = !floating || scrollingUp || open;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <motion.nav
          aria-label="Main"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`relative mx-auto flex w-full items-center justify-between transition-all duration-500 ease-soft ${
            floating
              ? "max-w-[1080px] py-2 pl-5 pr-2"
              : "max-w-[2000px] px-6 py-4 sm:px-10 sm:py-6 lg:px-14"
          } ${onLight ? "text-ink" : "text-cream"}`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 -z-10 rounded-full bg-cream/85 shadow-soft backdrop-blur-xl transition-opacity duration-500 ${
              floating ? "opacity-100" : "opacity-0"
            }`}
          />

          <Link to="/" className="font-serif text-xl tracking-display">
            {brandA}{" "}
            <span
              className={`italic transition-colors duration-500 ${
                onLight ? "text-wood" : "text-glow"
              }`}
            >
              &amp;
            </span>{" "}
            {brandB}
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
                          onLight ? "bg-ink" : "bg-cream"
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? (onLight ? "text-cream" : "text-ink") : ""
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
              variant={onLight ? "dark" : "light"}
              size="sm"
              icon={<ArrowRight />}
              className="hidden md:inline-flex"
            >
              {navCta.label}
            </Button>

            <div className="md:hidden">
              <AnimatePresence mode="wait" initial={false}>
                {menuVisible ? (
                  <motion.button
                    key="menu"
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? "Close menu" : "Open menu"}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 ${
                      floating || open
                        ? "bg-transparent"
                        : isHome
                          ? "bg-white/15 backdrop-blur-md"
                          : "bg-ink/5"
                    }`}
                  >
                    {open ? (
                      <CloseIcon width={22} height={22} />
                    ) : (
                      <MenuIcon width={22} height={22} />
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Button
                      href={navCta.href}
                      variant="dark"
                      size="sm"
                      icon={<ArrowRight />}
                    >
                      {navCta.label}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
