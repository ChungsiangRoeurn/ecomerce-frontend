// app/signup/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Please enter a valid email or phone number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border rounded-lg shadow-sm relative">
        {/* 
              Ot mean logo te
        <div className="absolute top-4 right-4">
          <div className="flex items-center">
            <Image
              src="/blush-logo-small.svg"
              alt="Blush Logo"
              width={16}
              height={16}
            />
            <span className="text-xs font-semibold ml-1">BLUSH</span>
          </div>
        </div> */}
        
        <CardHeader>
          <h2 className="text-2xl font-semibold">Sign up</h2>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First and last name"
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
                    <FormControl>
                      <Input
                        placeholder="Email or mobile phone number"
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
                    <FormDescription className="text-right text-xs text-gray-500">
                      At least 6 characters
                    </FormDescription>
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
                      <Input
                        type="password"
                        placeholder="Re-enter your password"
                        {...field}
                        className="rounded-md h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-full h-12"
              >
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Divider */}
      <div className="flex items-center w-full max-w-md my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-xs text-gray-500">Already have an account?</span>
        {/* <div className="flex-grow border-t border-gray-300"></div> */}
      </div>

      <Link href="/signIp" className="w-full max-w-md">
        <Button
          variant="outline"
          className="w-full border-gray-300 rounded-md h-12 text-gray-900"
        >
          Sign ip
        </Button>
      </Link>
    </div>
  )
}