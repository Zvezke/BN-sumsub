import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import RetrieveUserInformation from "@/components/RetrieveUserInformation";
import TestEmail from "@/components/TestEmail";
import Button from "@/components/Button";

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
    <>
      <div className="flex items-center justify-center gap-4">
        <Button link="/leasing-calculator" text="Leasing Calculator" />
        <RetrieveUserInformation />
        <TestEmail />
      </div>
    </>
  );
}
