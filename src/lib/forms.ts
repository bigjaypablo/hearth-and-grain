const endpoint = import.meta.env.VITE_FORMSPREE_URL as string | undefined;

type FormName = "contact" | "newsletter";
type Payload = Record<string, string>;
export type SubmitResult = { ok: true } | { ok: false; error: string };

export const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export async function submitForm(form: FormName, data: Payload): Promise<SubmitResult> {
  if (!endpoint) {
    return { ok: false, error: "This form is not connected yet. Please email us directly." };
  }

  const subject =
    form === "contact"
      ? `New project enquiry from ${data.name ?? "website"}`
      : "New newsletter signup";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ form, _subject: subject, ...data }),
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}
