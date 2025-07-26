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

const FormSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export function CallbackForm() {
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
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col gap-4"
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
  );
}
