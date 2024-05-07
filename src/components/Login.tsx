"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";
import { signIn } from "@/utils/auth";
import { signOut } from "@/utils/auth";
import Image from "next/image";

interface LoginData {
  email: string;
  password: string;
}

const schema: ZodType<LoginData> = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const submitData = async (data: LoginData) => {
    const { error } = await signIn(data.email, data.password);
    if (!error) router.push("/intra");
    else console.log("Login error", error.message);
  };

  // const handleLogout = async () => {
  //   const { error } = await signOut();
  //   if (error) {
  //     console.log("error", error);
  //     return;
  //   }
  // };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="/images/logo-sand.svg"
            alt="logo for banking north"
            width={50}
            height={50}
            className="mx-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to the test environment
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(submitData)}>
            <InputField
              label="Email address"
              id="email"
              type="email"
              register={register}
              validation={{ required: true }}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sand sm:text-sm sm:leading-6"
            />

            <InputField
              label="Password"
              id="password"
              type="password"
              register={register}
              validation={{ required: true }}
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sand sm:text-sm sm:leading-6"
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-400">
            No login?{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-sand hover:text-sand"
            >
              Sign up
            </Link>
          </p>
          {/* <button
            className="flex w-full justify-center rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
            onClick={handleLogout}
          >
            Logout
          </button> */}
        </div>
      </div>
    </>
  );
}
