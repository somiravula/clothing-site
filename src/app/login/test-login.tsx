"use client";

import * as z from "zod";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

// 1. Schema Definition (Zod)
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[@$&_-]/, "Password must contain at least one special character (@, $, &, _, or -)"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/products";

  // 2. Hook Form Initialization
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Submit Handler
  // Inside src/app/login/page.tsx -> onSubmit

const onSubmit = async (values: LoginFormValues) => {
  setIsLoading(true);
  
  // Attempt Login
  const { data, error } = await authClient.signIn.email({
    email: values.email,
    password: values.password,
  });

  // If login fails because user doesn't exist, try to Sign Up automatically 
  // (Common pattern for "Magic" dummy apps)
  if (error && error.status === 401) {
    const { error: signUpError } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.email.split('@')[0], // Mock name
    });

    if (signUpError) {
      toast.error(signUpError.message);
      setIsLoading(false);
      return;
    }
  } else if (error) {
    toast.error(error.message);
    setIsLoading(false);
    return;
  }

  toast.success("Authenticated successfully.");
  router.push(callbackUrl);
  router.refresh();
};

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Visual Brand Panel */}
      <section className="relative hidden lg:block bg-zinc-950">
        <Image
          src="/stella.png"
          alt="Stella Editorial"
          fill
          priority
          className="object-cover opacity-40 grayscale"
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
          <h2 className="text-3xl font-black tracking-tighter italic uppercase">Stella</h2>
          <blockquote className="max-w-md">
            <p className="text-4xl font-serif italic leading-tight text-zinc-200">
              "Style is a way to say who you are without having to speak."
            </p>
            <footer className="mt-6 text-xs font-bold uppercase tracking-[0.4em] text-cyan-500">
              Rachel Zoe — Global Stylist
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Form Panel */}
      <section className="flex flex-col items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-[420px] space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <header className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900">Sign In</h1>
            <p className="text-zinc-500 text-lg">Enter your details to access your account.</p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          placeholder="name@company.com"
                          className="h-14 pl-12 rounded-2xl bg-zinc-50 border-none transition-all focus:ring-2 focus:ring-cyan-500/20"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-bold text-rose-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Password
                      </FormLabel>
                      <Button variant="link" className="h-auto p-0 text-[10px] font-bold uppercase text-cyan-600">
                        Forgot?
                      </Button>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="h-14 pl-12 rounded-2xl bg-zinc-50 border-none transition-all focus:ring-2 focus:ring-cyan-500/20"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-bold text-rose-500" />
                  </FormItem>
                )}
              />



              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-zinc-900 text-white font-bold text-lg hover:bg-cyan-600 transition-all shadow-2xl shadow-zinc-200"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Continue <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <footer className="pt-8 space-y-8">
            <div className="text-center text-sm">
              <span className="text-zinc-500">New to the platform?</span>{" "}
              <Button className={cn("font-bold hover:text-cyan-600 underline-offset-4 hover:underline transition-all", "tex-white")}>
                Create an account
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-3 opacity-30">
              <ShieldCheck className="h-4 w-4" />
              <p className="text-[9px] font-bold uppercase tracking-[0.3em]">
                Secure session by Better-Auth v1.1
              </p>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}