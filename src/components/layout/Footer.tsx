import { useState, type FormEvent } from "react";
import { footer } from "../../data/footer";
import { site } from "../../data/site";
import Reveal from "../motion/Reveal";
import TextReveal from "../motion/TextReveal";
import Button from "../ui/Button";
import AppLink from "../ui/AppLink";
import { ArrowRight } from "../ui/Icons";
import { scrollToTop } from "./SmoothScroll";
import { isEmail, submitForm } from "../../lib/forms";

type Status = "idle" | "error" | "sending" | "failed" | "done";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const { newsletter } = footer;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trap = new FormData(e.currentTarget).get("_gotcha");
    if (typeof trap === "string" && trap.length > 0) {
      setStatus("done");
      return;
    }
    if (!isEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const result = await submitForm("newsletter", { email: email.trim() });
    if (result.ok) {
      setEmail("");
      setStatus("done");
    } else {
      setStatus("failed");
    }
  };

  return (
    <footer className="p-3 pt-3 sm:p-4">
      <div className="overflow-hidden rounded-card-lg bg-ink text-cream">
        <div className="container-x pb-8 pt-14 sm:pt-20">
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="max-w-sm text-cream/70">{footer.blurb}</p>

              <h3 className="mt-10 font-sans text-xs font-medium uppercase tracking-[0.18em] text-cream/50">
                {newsletter.title}
              </h3>
              <p className="mt-3 text-sm text-cream/70">{newsletter.text}</p>

              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-5 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={newsletter.placeholder}
                  aria-invalid={status === "error"}
                  aria-describedby="newsletter-msg"
                  className="min-w-0 flex-1 rounded-full border border-cream/20 bg-cream/10 px-5 py-3.5 text-sm text-cream placeholder:text-cream/45 focus:border-cream/60 focus:outline-none"
                />
                <Button type="submit" variant="light" icon={<ArrowRight />} disabled={status === "sending"}>
                  {newsletter.button}
                </Button>
              </form>

              <p
                id="newsletter-msg"
                role="status"
                className={`mt-3 min-h-[1.25rem] text-sm ${
                  status === "error" || status === "failed" ? "text-blush" : "text-cream/70"
                }`}
              >
                {status === "done" && newsletter.success}
                {status === "error" && newsletter.error}
                {status === "failed" && "Something went wrong. Please try again."}
                {status === "sending" && "Subscribing..."}
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:pl-16">
              {footer.columns.map((col, i) => (
                <Reveal key={col.title} delay={0.1 + i * 0.1}>
                  <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-cream/50">
                    {col.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <AppLink
                          href={l.href}
                          className="break-words text-cream/80 transition-colors duration-300 hover:text-cream"
                        >
                          {l.label}
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 overflow-hidden sm:mt-24">
            <TextReveal
              as="p"
              text={site.name}
              stagger={0.1}
              className="select-none whitespace-nowrap font-serif text-[clamp(2.5rem,11.5vw,10rem)] leading-none tracking-tightest text-cream/95"
            />
          </div>

          <div className="mt-10 flex flex-col-reverse items-start justify-between gap-5 border-t border-cream/15 pt-6 text-sm text-cream/55 sm:flex-row sm:items-center">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. {footer.legal}
            </p>
            <button
              type="button"
              onClick={() => scrollToTop()}
              className="group inline-flex items-center gap-2 text-cream/80 transition-colors duration-300 hover:text-cream"
            >
              Back to top
              <span className="grid h-9 w-9 place-items-center rounded-full border border-cream/25 transition-transform duration-500 ease-soft group-hover:-translate-y-1">
                <ArrowRight className="-rotate-90" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
