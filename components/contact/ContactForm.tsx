"use client";

import { useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  company: "",
  product: "",
  message: "",
  website: "", // honeypot
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("success");
      setValues(initialValues);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "We couldn't send your enquiry. Please WhatsApp or call us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line p-8 text-center">
        <p className="font-heading font-semibold text-lg">Thank you. Your enquiry has been sent.</p>
        <p className="mt-2 text-sm text-ink-muted">Our team will contact you shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-[13px] font-medium border-b border-ink pb-0.5"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real users */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          required
          value={values.name}
          error={errors.name}
          onChange={(v) => update("name", v)}
        />
        <Field
          label="Phone"
          required
          type="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          label="Company"
          value={values.company}
          error={errors.company}
          onChange={(v) => update("company", v)}
        />
      </div>

      <Field
        label="Equipment / Service Required"
        value={values.product}
        error={errors.product}
        onChange={(v) => update("product", v)}
      />

      <div>
        <label className="text-xs text-ink-muted" htmlFor="message">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us which equipment you need, or describe the machine and its repair or servicing requirement."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(
            "mt-1.5 w-full border bg-transparent px-3.5 py-3 text-sm outline-none transition-colors resize-none",
            errors.message ? "border-red-500" : "border-line focus:border-ink",
          )}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-accent hover:bg-accent-strong text-white px-7 py-3.5 text-[13px] font-medium tracking-tight transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label className="text-xs text-ink-muted" htmlFor={id}>
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-1.5 w-full border bg-transparent px-3.5 py-3 text-sm outline-none transition-colors",
          error ? "border-red-500" : "border-line focus:border-ink",
        )}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
