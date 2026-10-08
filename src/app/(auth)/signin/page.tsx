"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: SignInValues) {
    setLoading(true);

    const result = await signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });

    setLoading(false);

    if (result.error) {
      toast.error("Invalid email or password. Please try again.");
    } else {
      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="type-eyebrow">Welcome back</p>
          <h1 className="type-heading mt-3 text-4xl">Sign in</h1>
          <p className="type-body mt-3 text-base">
            Enter your credentials to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="type-body mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-rose-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="type-body mb-2 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-rose-600">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3.5! text-sm! disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="type-body mt-8 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-rose-600 hover:text-rose-700">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
