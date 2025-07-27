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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { submit } from "./actions/submit";
import { useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { contactSubject, FormSchema } from "./schema";

export function ContactForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      phone: "",
      postcode: "",
      email: "",
      subject: "",
      message: "",
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
          <div className="p-4 md:p-8 max-w-120 flex flex-col gap-4 items-center justify-center rounded-lg bg-white shadow-lg w-4/5">
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
          <div className="p-4 md:p-8 max-w-120 flex flex-col gap-4 items-center justify-center rounded-lg bg-white shadow-lg w-4/5">
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
          className="px-8 space-y-4 flex flex-col gap-4 text-sky-900"
        >
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jim Bob" {...field} />
                  </FormControl>
                  <FormDescription className="text-left text-xs">
                    What you would like us to call you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="">Post Code</FormLabel>
                  <FormControl>
                    <Input placeholder="EN4 8BZ" {...field} />
                  </FormControl>
                  <FormDescription className="text-left text-xs">
                    In case you need us to come to you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="">Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Jim Bob" {...field} />
                  </FormControl>
                  <FormDescription className="text-left text-xs">
                    A number we can call back on
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jim@bob.com" {...field} />
                  </FormControl>
                  <FormDescription className="text-left text-xs">
                    An email address we can reply to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Subject</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Select a reason for contacting us"
                        className="capitalize"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contactSubject.map((subject) => (
                      <SelectItem
                        key={`contact-item-${subject}`}
                        value={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Select the service you would like to contact us about
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the reason you are contacting us"
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Add any extra information you think would be useful for us to
                  know
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
