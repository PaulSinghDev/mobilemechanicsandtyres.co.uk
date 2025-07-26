"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

const contactSubject = ["service", "mot", "repair", "breakdown", "other"];

const FormSchema = z.object({
  name: z.string(),
  postcode: z.string(),
  email: z.email(),
  phone: z.string(),
  subject: z.string().refine((value) => contactSubject.includes(value)),
  message: z.email(),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-4 text-sky-900"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
}
