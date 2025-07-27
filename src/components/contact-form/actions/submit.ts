"use server";

import z from "zod";
import { GenericApiResponse } from "@/types/api";
import { receiver, transport } from "@/lib/nodemailer";
import { FormSchema } from "../schema";

export const submit = async (
  values: z.infer<typeof FormSchema>
): Promise<GenericApiResponse<{ messageId: string }, z.ZodError | string>> => {
  try {
    const result = FormSchema.safeParse(values);
    if (!result.success) {
      return { success: false, error: result.error, data: null };
    } else {
      const info = await transport.sendMail({
        from: `"${values.name}" <${values.email}>`,
        to: `${receiver}`,
        subject: `New enquiry from website: ${values.subject}`,
        text: `From: ${values.name}\nPostcode: ${values.postcode}\nEmail: ${values.email}\nPhone: ${values.phone}\nSubject: ${values.subject}\nMessage: ${values.message}`, // plain‑text body
      });

      return {
        success: true,
        data: { messageId: info.messageId },
        error: null,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      data: null,
      error:
        "There was an error processing your request, please try again or give us a call if the problem persists.",
    };
  }
};
