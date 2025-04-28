'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
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
  email: z.string().email({ message: "Please enter a valid email or phone number" }),
  password: z.string().min(1, { message: "Password is required" }),
})
export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* Logo */}
      {/* <div className="mb-4">
        <div className="relative w-32 h-24">
          <Image
            src="/blush-logo.svg"
            alt="Blush Logo"
            fill
            priority
            className="mb-6"
          />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">BLUSH</h1>
      </div> */}

      {/* Sign In Card */}
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

      <div className="flex items-center w-full max-w-md my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-4 text-xs text-gray-500">New to Blush?</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Link href="/signUp" className="w-full max-w-md">
        <Button
          variant="outline"
          className="w-full border-gray-300 rounded-md h-12 text-gray-900"
        >
          Sign up
        </Button>
      </Link>
    </div>
  )
}