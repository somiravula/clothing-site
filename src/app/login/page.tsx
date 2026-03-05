"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, useSession } from "@/lib/auth-client";

const emailSchema = z.string().email("Please enter a valid email address");

const signUpPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit")
  .regex(
    /[@$&_-]/,
    "Password must contain at least one special character (@, $, &, _, or -)",
  );

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(20, "Name must be at most 20 characters")
  .regex(
    /^[A-Za-z0-9 ]+$/,
    "Name can contain only letters, numbers, and spaces",
  );

const loginSchema = z.object({
  name: z.string().optional(),
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: signUpPasswordSchema,
});

type AuthFormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/products";
  const { data: session, isPending: isSessionPending } = useSession();

  useEffect(() => {
    if (!isSessionPending && session) {
      router.replace(callbackUrl);
    }
  }, [callbackUrl, isSessionPending, router, session]);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(isSignUp ? signUpSchema : loginSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsLoading(true);

    if (isSignUp) {
      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name ?? "",
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        setIsLoading(false);
        return;
      }
      toast.success("Welcome to Stella!");
    } else {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials");
        setIsLoading(false);
        return;
      }
      toast.success("Identity verified. Welcome back.");
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-white">
      <section className="relative hidden lg:block bg-zinc-950">
        <Image
          src="/stella.png"
          alt="Stella Editorial"
          fill
          priority
          className="object-cover opacity-40 grayscale"
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
          <div className="p-3">
            <Image
              src="/stella.png"
              alt="Stella"
              width={1011}
              height={341}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
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
      <div className="p-3 lg:hidden">
        <Image
          src="/stella.png"
          alt="Stella"
          width={1011}
          height={341}
          className="h-12 w-auto object-contain"
          priority
        />
      </div>

      <section className="flex flex-col items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-[420px] space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <header className="space-y-3 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900">
              {isSignUp ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-zinc-500 text-lg">
              {isSignUp
                ? "Join our curated fashion community."
                : "Enter your details to access your account."}
            </p>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {isSignUp && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                          <Input
                            placeholder="Alex Stella"
                            className="h-14 pl-12 rounded-2xl bg-zinc-50 border-none transition-all focus:ring-2 focus:ring-cyan-500/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <p className="min-h-5 pt-1 text-xs font-bold text-rose-500">
                        {fieldState.error?.message ?? " "}
                      </p>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
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
                    <p className="min-h-5 pt-1 text-xs font-bold text-rose-500">
                      {fieldState.error?.message ?? " "}
                    </p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                        Password
                      </FormLabel>
                      {!isSignUp && (
                        <span className="h-auto p-0 text-[10px] font-bold uppercase text-cyan-600">
                          Forgot?
                        </span>
                      )}
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
                    <p className="min-h-5 pt-1 text-xs font-bold text-rose-500">
                      {fieldState.error?.message ?? " "}
                    </p>
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
                    {isSignUp ? "Create Account" : "Continue"}{" "}
                    <ArrowRight className="h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

          <footer className="pt-8 space-y-8">
            <div className="text-center text-sm">
              <span className="text-zinc-500">
                {isSignUp ? "Already a member?" : "New to the platform?"}
              </span>{" "}
              <Button
                variant="ghost"
                onClick={() => {
                  form.clearErrors();
                  setIsSignUp(!isSignUp);
                }}
                className="font-bold text-zinc-900 hover:text-cyan-600 p-0 h-auto underline-offset-4 hover:underline"
              >
                {isSignUp ? "Sign In" : "Create an account"}
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
