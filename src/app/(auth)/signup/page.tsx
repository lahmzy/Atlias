"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpValues) {
    setLoading(true);

    const result = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error.message || "Something went wrong. Please try again.");
    } else {
      toast.success("Account created successfully! Welcome to Atlias.");
      router.push("/");
      router.refresh();
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="type-eyebrow">Join us</p>
          <h1 className="type-heading mt-3 text-4xl">Create account</h1>
          <p className="type-body mt-3 text-base">
            Start your clean beauty journey today.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="type-body mb-2 block text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-rose-600">{errors.name.message}</p>
            )}
          </div>

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
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-rose-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="type-body mb-2 block text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-rose-300 bg-cream-50 px-4 py-3 text-espresso-900 placeholder:text-ink-500/50 focus:border-rose-500 focus:outline-none"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-rose-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3.5! text-sm! disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="type-body mt-8 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-medium text-rose-600 hover:text-rose-700">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
