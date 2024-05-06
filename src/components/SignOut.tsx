"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    const supabase = createClient();
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.log("error", error);
      return;
    }

    router.push("/login");
  };

  return (
    <div>
      {" "}
      <button
        onClick={handleSignOut}
        className="flex w-full justify-center rounded-md bg-sand px-3 py-1.5 text-sm font-semibold leading-6 text-himmel shadow-sm hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOut;
