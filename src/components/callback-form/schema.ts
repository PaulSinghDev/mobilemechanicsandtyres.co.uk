import z from "zod";

export const FormSchema = z.object({
  name: z.string(),
  phone: z.string(),
});
