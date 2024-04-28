import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import CalculatorLeasing from "@/components/CalculatorLeasing";

export default function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return <CalculatorLeasing />;
}
