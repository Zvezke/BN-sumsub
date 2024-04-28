"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const schema: ZodType<LoginData> = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: LoginData) => {
    const supabase = createClient();
    let { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (signUpError) {
      console.log("error", signUpError);
      return;
    }

    if (signUpData) {
      redirect("/");
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.log("error", error);
      return;
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to the test environment
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitData)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...register("email")}
                  className="focus:ring-sand block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="text-sand hover:text-sand font-semibold"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  // name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register("password")}
                  className="focus:ring-sand block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-sand text-himmel hover:bg-sand focus-visible:outline-sand flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-400">
            No login?{" "}
            <Link
              href="#"
              className="text-sand hover:text-sand font-semibold leading-6"
            >
              Sign up
            </Link>
          </p>
          <button
            className="bg-sand text-himmel hover:bg-sand focus-visible:outline-sand flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
