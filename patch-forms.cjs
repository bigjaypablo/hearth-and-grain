const fs = require("fs");

const missing = [];
const outputs = [];

function patch(file, pairs) {
  let s = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  for (const [a, b] of pairs) {
    const found = typeof a === "string" ? s.includes(a) : a.test(s);
    if (!found) {
      missing.push(file + ": " + String(a).slice(0, 80));
      continue;
    }
    s = s.replace(a, () => b);
  }
  outputs.push([file, s]);
}

patch("src/pages/Contact.tsx", [
  [
    'import { EASE } from "../lib/motion";',
    'import { EASE } from "../lib/motion";\nimport { submitForm } from "../lib/forms";',
  ],
  [
    'const [status, setStatus] = useState<Status>("idle");',
    'const [status, setStatus] = useState<Status>("idle");\n  const [submitError, setSubmitError] = useState("");',
  ],
  [
    /(?:\/\/ Front-end[^\n]*\n\s*)?await new Promise\([^\n]*\n\s*setStatus\("done"\);/,
    `setSubmitError("");
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
    }`,
  ],
  [
    "const found = validate(values);",
    `const trap = new FormData(e.currentTarget).get("_gotcha");
    if (typeof trap === "string" && trap.length > 0) {
      setStatus("done");
      return;
    }
    const found = validate(values);`,
  ],
  [
    '<div className="grid gap-x-5 sm:grid-cols-2">',
    `<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <div className="grid gap-x-5 sm:grid-cols-2">`,
  ],
  [
    /<Button\s+type="submit"/,
    `{submitError && (
                      <p role="alert" className="mb-4 text-sm text-clay">
                        {submitError}
                      </p>
                    )}
                    <Button
                      type="submit"`,
  ],
]);

patch("src/components/layout/Footer.tsx", [
  [
    'type Status = "idle" | "error" | "done";',
    'type Status = "idle" | "error" | "sending" | "failed" | "done";',
  ],
  [
    'import { scrollToTop } from "./SmoothScroll";',
    'import { scrollToTop } from "./SmoothScroll";\nimport { isEmail, submitForm } from "../../lib/forms";',
  ],
  [
    /const onSubmit = \(e: FormEvent<HTMLFormElement>\) => \{[\s\S]*?\n  \};/,
    `const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
  };`,
  ],
  [
    '<label htmlFor="newsletter-email" className="sr-only">',
    `<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <label htmlFor="newsletter-email" className="sr-only">`,
  ],
  [
    '<Button type="submit" variant="light" icon={<ArrowRight />}>',
    '<Button type="submit" variant="light" icon={<ArrowRight />} disabled={status === "sending"}>',
  ],
  [
    'status === "error" ? "text-blush" : "text-cream/70"',
    'status === "error" || status === "failed" ? "text-blush" : "text-cream/70"',
  ],
  [
    '{status === "error" && newsletter.error}',
    `{status === "error" && newsletter.error}
                {status === "failed" && "Something went wrong. Please try again."}
                {status === "sending" && "Subscribing..."}`,
  ],
]);

if (missing.length > 0) {
  console.error("Nothing was written. These edits did not match:");
  missing.forEach((m) => console.error(" - " + m));
  process.exit(1);
}

outputs.forEach(([file, content]) => {
  fs.writeFileSync(file, content);
  console.log("patched " + file);
});
