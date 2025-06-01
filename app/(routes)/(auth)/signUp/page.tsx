// app/signup/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Full name is required" }),
<<<<<<< Updated upstream:app/(routes)/(auth)/signUp/page.tsx
    email: z
      .string()
      .email({ message: "Please enter a valid email or phone number" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
=======
    email: z.string().email({ message: "Please enter a valid email" }),
    phone: z.string().min(8, { message: "Please enter a valid phone number" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
>>>>>>> Stashed changes:app/(auth)/signUp/page.tsx
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
<<<<<<< Updated upstream:app/(routes)/(auth)/signUp/page.tsx
=======
  const router = useRouter();

>>>>>>> Stashed changes:app/(auth)/signUp/page.tsx
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

<<<<<<< Updated upstream:app/(routes)/(auth)/signUp/page.tsx
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
=======
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { confirmPassword, ...data } = values;
    try {
      const response = await signupUser(data);

      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      toast.success("Signup successful! Welcome aboard 🎉");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || "Signup failed. Please try again.");
      console.error("Signup Error:", error);
    }
>>>>>>> Stashed changes:app/(auth)/signUp/page.tsx
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">

      <Card className="w-full max-w-md border rounded-lg shadow-sm relative">
        <CardHeader className="text-2xl flex justify-center font-semibold">Sign up</CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
<<<<<<< Updated upstream:app/(routes)/(auth)/signUp/page.tsx
                      <Input
                        placeholder="First and last name"
                        {...field}
                        className="rounded-md h-12"
                      />
=======
                      <Input placeholder="Full Name" {...field} className="rounded-md h-12" />
>>>>>>> Stashed changes:app/(auth)/signUp/page.tsx
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
                    <FormControl>
<<<<<<< Updated upstream:app/(routes)/(auth)/signUp/page.tsx
                      <Input
                        placeholder="Email or mobile phone number"
                        {...field}
                        className="rounded-md h-12"
                      />
=======
                      <Input placeholder="Email" {...field} className="rounded-md h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} className="rounded-md h-12" />
>>>>>>> Stashed changes:app/(auth)/signUp/page.tsx
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
                      <Input type="password" placeholder="Password" {...field} className="rounded-md h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Re-enter password" {...field} className="rounded-md h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-full h-12"
              >
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
