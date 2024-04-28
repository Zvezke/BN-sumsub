import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import CalculatorLeasing from "@/components/CalculatorLeasing";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col justify-center bg-[url('/images/bg_dummy.png')] p-4">
      <div className="ml-[5%] gap-8 text-neutral-200 lg:ml-[27.5vw] lg:flex lg:items-end">
        <CalculatorLeasing />
      </div>
    </main>
  );
}
