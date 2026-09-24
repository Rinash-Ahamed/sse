import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  products: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
  message: z.string().trim().optional(),
  // Honeypot must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
