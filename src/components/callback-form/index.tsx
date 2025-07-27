"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldPath, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import z from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { submit } from "./actions/submit";
import { FormSchema } from "./schema";

export function CallbackForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const result = FormSchema.safeParse(data);
      if (!result.success) {
        // Iterate our errors
        for (const error in result.error) {
          const message = result.error[error as keyof typeof result.error];

          // No message
          if (!message) {
            continue;
          }

          // Set the feedback on the form
          form.setError(
            error as FieldPath<z.output<typeof FormSchema>>,
            message
          );

          return;
        } // ZodError instance
      }

      const backendResult = await submit(data);

      if (backendResult.error && typeof backendResult.error === "string") {
        form.setError("root", { message: backendResult.error });
      } else if (
        backendResult.error &&
        typeof backendResult.error != "string"
      ) {
        // Iterate our errors
        for (const error in backendResult.error) {
          const message =
            backendResult.error[error as keyof typeof backendResult.error];

          // No message
          if (!message) {
            continue;
          }

          // Set the feedback on the form
          form.setError(
            error as FieldPath<z.output<typeof FormSchema>>,
            message
          );

          return;
        } // ZodError instance
      } else {
        setShowSuccess(true);
      }
    } catch (e) {
      console.error(e);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      {loading ? (
        <div className="absolute z-20 w-full h-full top-0 left-0 bg-sky-50/80 flex flex-col items-center justify-center">
          <div className="p-2 rounded-lg bg-white shadow-lg">
            <LoaderCircle size={40} className="text-sky-600 animate-spin" />
          </div>
        </div>
      ) : null}

      {showError ? (
        <div className="absolute z-20 w-full h-full top-0 left-0 bg-sky-50/80 flex flex-col items-center justify-center">
          <div className="p-4 md:p-8 max-w-120 flex flex-col gap-4 items-center justify-center rounded-lg bg-white shadow-lg w-[95%]">
            <h2 className="text-xl">Something went wrong</h2>
            <p>
              There was an error processing your request. Please try again or,
              alternatively, call us on 07789934355
            </p>
            <Button
              onClick={() => setShowError(false)}
              className="bg-sky-200 text-dark font-bold"
            >
              Close <X className="ml-1" />
            </Button>
          </div>
        </div>
      ) : null}

      {showSuccess ? (
        <div className="absolute z-20 w-full h-full top-0 left-0 bg-sky-50/80 flex flex-col items-center justify-center">
          <div className="p-4 md:p-8 max-w-120 flex flex-col gap-4 items-center justify-center rounded-lg bg-white shadow-lg w-[95%]">
            <h2 className="text-xl">Message sent</h2>
            <p>
              Your message has been sent to our team and someone will respond to
              you ASAP. If your request is urgent please give us a call on
              07789934355.
            </p>
            <Button
              onClick={() => setShowSuccess(false)}
              className="bg-sky-200 text-dark font-bold"
            >
              Close <X className="ml-1" />
            </Button>
          </div>
        </div>
      ) : null}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-4 px-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jim Bob" {...field} />
                </FormControl>
                <FormDescription className="text-white/90 text-left text-xs">
                  What you would like us to call you
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-white">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Jim Bob" {...field} />
                </FormControl>
                <FormDescription className="text-white/90 text-left text-xs">
                  A number we can call back on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-sky-600 text-lg font-bold"
            size={"lg"}
          >
            Submit form
          </Button>
        </form>
      </Form>
    </div>
  );
}
