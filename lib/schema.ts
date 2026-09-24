import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  product: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Please add a short message"),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
