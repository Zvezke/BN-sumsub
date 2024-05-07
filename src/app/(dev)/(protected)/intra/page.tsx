import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SumsubWebSdk from "@sumsub/websdk-react";

import RetrieveUserInformation from "@/components/RetrieveUserInformation";
import TestEmail from "@/components/TestEmail";
import Button from "@/components/Button";
import SignOut from "@/components/SignOut";
import Sumsub from "@/components/Sumsub";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!user) {
    redirect("/login");
  }

  if (error) {
    console.log("error", error);
    return;
  }

  if (!users.is_verified) {
    redirect("/not-verified");
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center gap-4">
        <RetrieveUserInformation />
        <TestEmail />
        <SignOut />
        {/* <Sumsub /> */}
      </div>
    </>
  );
}
