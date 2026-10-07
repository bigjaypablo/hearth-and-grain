import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "../data/contact";
import { usePageTitle } from "../hooks/usePageTitle";
import { EASE } from "../lib/motion";
import { submitForm } from "../lib/forms";
import PageHeader from "../components/ui/PageHeader";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";
import Reveal from "../components/motion/Reveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { ArrowRight, CheckIcon } from "../components/ui/Icons";

type Values = { name: string; email: string; type: string; budget: string; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "done";

const empty: Values = {
  name: "",
  email: "",
  type: contact.projectTypes[0],
  budget: contact.budgets[1],
  message: "",
};

const inputCls =
  "w-full rounded-2xl border border-line bg-cream px-5 py-4 text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none";

const validate = (v: Values): Errors => {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "A few more words about your project would help.";
  return e;
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      <p id={`${id}-err`} role="alert" className="mt-1.5 min-h-[1.25rem] text-sm text-clay">
        {error}
      </p>
    </div>
  );
}

export default function Contact() {
  usePageTitle("Contact");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trap = new FormData(e.currentTarget).get("_gotcha");
    if (typeof trap === "string" && trap.length > 0) {
      setStatus("done");
      return;
    }
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    setSubmitError("");
    const result = await submitForm("contact", {
      name: values.name.trim(),
      email: values.email.trim(),
      projectType: values.type,
      budget: values.budget,
      message: values.message.trim(),
    });
    if (result.ok) {
      setStatus("done");
    } else {
      setSubmitError(result.error);
      setStatus("idle");
    }
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setStatus("idle");
  };

  return (
    <>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
      />

      <section className="container-x pb-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <dl className="space-y-6">
                {contact.details.map((d) => (
                  <div key={d.label} className="border-t border-line pt-4">
                    <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      {d.label}
                    </dt>
                    <dd className="mt-1.5 text-lg">
                      {"href" in d ? (
                        <a href={d.href} className="transition-colors hover:text-sage">
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <h2 className="mt-14 text-2xl">What happens next</h2>
            <Stagger className="mt-6 space-y-5">
              {contact.next.map((n, i) => (
                <StaggerItem key={n.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sand text-sm font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-sm text-muted">{n.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-card-lg bg-sand/50 p-6 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex min-h-[420px] flex-col items-start justify-center"
                    role="status"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                      className="grid h-16 w-16 place-items-center rounded-full bg-sage text-cream"
                    >
                      <CheckIcon width={28} height={28} />
                    </motion.span>
                    <h2 className="mt-6 text-display-md">Thank you, {values.name.split(" ")[0]}.</h2>
                    <p className="mt-3 max-w-md text-muted">
                      Your message is in. We will reply to {values.email} within two working days.
                    </p>
                    <div className="mt-8">
                      <Button variant="dark" onClick={reset}>
                        Send another message
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <div className="grid gap-x-5 sm:grid-cols-2">
                      <Field id="name" label="Your name" error={errors.name}>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={(e) => set("name", e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby="name-err"
                          placeholder="Jane Doe"
                          className={inputCls}
                        />
                      </Field>
                      <Field id="email" label="Email address" error={errors.email}>
                        <input
                          id="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={(e) => set("email", e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby="email-err"
                          placeholder="jane@email.com"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <fieldset className="mb-6">
                      <legend className="mb-3 text-sm font-medium">What are you planning?</legend>
                      <div className="flex flex-wrap gap-2">
                        {contact.projectTypes.map((t) => (
                          <Chip
                            key={t}
                            group="contact-type"
                            label={t}
                            active={values.type === t}
                            onClick={() => set("type", t)}
                          />
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="mb-6">
                      <legend className="mb-3 text-sm font-medium">Budget range</legend>
                      <div className="flex flex-wrap gap-2">
                        {contact.budgets.map((b) => (
                          <Chip
                            key={b}
                            group="contact-budget"
                            label={b}
                            active={values.budget === b}
                            onClick={() => set("budget", b)}
                          />
                        ))}
                      </div>
                    </fieldset>

                    <Field id="message" label="Tell us about your space" error={errors.message}>
                      <textarea
                        id="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => set("message", e.target.value)}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby="message-err"
                        placeholder="Room sizes, style you like, timeline, anything that helps."
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    {submitError && (
                      <p role="alert" className="mb-4 text-sm text-clay">
                        {submitError}
                      </p>
                    )}
                    <Button
                      type="submit"
                      icon={<ArrowRight />}
                      disabled={status === "sending"}
                      className="mt-2 w-full sm:w-auto"
                    >
                      {status === "sending" ? "Sending..." : "Send message"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
