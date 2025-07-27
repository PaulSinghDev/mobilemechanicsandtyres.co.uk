import z from "zod";

export const contactSubject = [
  "service",
  "mot",
  "repair",
  "breakdown",
  "other",
];

export const FormSchema = z.object({
  name: z.string().refine((arg) => arg.length > 3 && /^[a-z\- ]+$/i.test(arg), {
    error:
      "Name can only contain letters, spaces and hyphens and must be at least 3 characters long",
  }),
  postcode: z
    .string()
    .refine((value) => /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(value), {
      error: "It seems that you entered an invalid postcode",
    }),
  email: z.email(),
  phone: z
    .string()
    .min(10)
    .max(14)
    .refine((value) => /^[\d+]+$/.test(value), {
      error: "Only number and + are allowed",
    }),
  subject: z.string().refine((value) => contactSubject.includes(value)),
  message: z.string().min(10),
});
