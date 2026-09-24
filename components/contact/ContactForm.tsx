"use client";

import { useState, type FormEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { contactSchema } from "@/lib/schema";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { generalWhatsAppLink } from "@/lib/whatsapp";

type Status = "idle" | "submitting" | "success" | "error";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  company: "",
  products: [] as string[],
  message: "",
  website: "", // honeypot
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update(field: Exclude<keyof typeof values, "products">, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function toggleProduct(name: string) {
    setValues((v) => ({
      ...v,
      products: v.products.includes(name)
        ? v.products.filter((item) => item !== name)
        : [...v.products, name],
    }));
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
        <p className="font-heading font-semibold text-lg">Your enquiry has been sent.</p>
        <p className="mt-2 text-sm text-ink-muted">We&apos;ll reply using the contact details you provided.</p>
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
      {/* Honeypot field, hidden from real users */}
      <div className="sr-only" aria-hidden="true">
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

      <div>
        <span className="text-xs text-ink-muted" id="equipment-or-service-label">
          Equipment or service needed
        </span>
        <details className="group relative mt-1.5 border border-line open:border-ink">
          <summary
            aria-labelledby="equipment-or-service-label"
            className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-3 text-sm marker:hidden [&::-webkit-details-marker]:hidden"
          >
            <span className={cn("min-w-0 truncate", values.products.length ? "text-ink" : "text-ink-muted")}>
              {values.products.length === 0
                ? "Choose equipment or services (optional)"
                : values.products.length === 1
                  ? values.products[0]
                  : `${values.products.length} items selected`}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="max-h-72 overflow-y-auto border-t border-line bg-white px-3.5 py-3">
            <p className="mb-3 text-xs text-ink-muted">Select as many as you need.</p>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Equipment</p>
            {products.map((product) => (
              <SelectionOption
                key={product.id}
                name={product.name}
                checked={values.products.includes(product.name)}
                onChange={() => toggleProduct(product.name)}
              />
            ))}
            <p className="mb-1.5 mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Services</p>
            {["Equipment Repairs", "Equipment Servicing"].map((service) => (
              <SelectionOption
                key={service}
                name={service}
                checked={values.products.includes(service)}
                onChange={() => toggleProduct(service)}
              />
            ))}
            <p className="mb-1.5 mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Other</p>
            <SelectionOption
              name="Not sure / Other"
              checked={values.products.includes("Not sure / Other")}
              onChange={() => toggleProduct("Not sure / Other")}
            />
          </div>
        </details>
        {values.products.length > 0 && (
          <p className="mt-2 text-xs leading-relaxed text-ink-muted">Selected: {values.products.join(", ")}</p>
        )}
      </div>

      <div>
        <label className="text-xs text-ink-muted" htmlFor="message">
          Message (optional)
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us what equipment you need, or describe the machine that needs repair or servicing."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1.5 w-full resize-none border border-line bg-transparent px-3.5 py-3 text-sm outline-none transition-colors focus:border-ink"
        />
      </div>

      {serverError && (
        <div role="alert" className="text-sm text-red-700">
          <p>{serverError}</p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
            <a href="tel:+919842230721" className="underline underline-offset-2">Call +91 98422 30721</a>
            <a href={generalWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Message us on WhatsApp</a>
          </div>
        </div>
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

function SelectionOption({ name, checked, onChange }: { name: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm text-ink hover:bg-surface/70 focus-within:bg-surface/70 focus-within:outline-2 focus-within:outline-accent">
      <span className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border",
        checked ? "border-accent bg-accent text-white" : "border-line bg-white",
      )}>
        {checked && <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span>{name}</span>
    </label>
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
