// utils/auth.ts
import { createClient } from "@/utils/supabase/client";
import { AuthSession, AuthError } from "@supabase/supabase-js";

export const signIn = async (
  email: string,
  password: string,
): Promise<{ session: AuthSession | null; error: AuthError | null }> => {
  const supabase = createClient();
  let { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    console.log("error", signInError);
    return { session: null, error: signInError };
  }
  return { session: signInData.session, error: null };
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const supabase = createClient();
  return supabase.auth.signOut();
};
