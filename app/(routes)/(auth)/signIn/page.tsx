"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email or phone number" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border rounded-lg shadow-sm">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center">Sign in</h2>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* <div>Hello</div> */}
                      <Input
                        placeholder="jaingsung@gmail.com"
                        {...field}
                        className="rounded-md h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-indigo-900">
                      Email or Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone number"
                        {...field}
                        className="rounded-md h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="rounded-md h-12"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>Forget password?</FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex items-center w-full max-w-md my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <Link href="/signUp">
                  <span className="px-4 text-xs text-gray-500">
                    Don't have an account?
                  </span>
                </Link>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-full h-12"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
