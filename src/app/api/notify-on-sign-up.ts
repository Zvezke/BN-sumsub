import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const transporter = nodemailer.createTransport({
    host: "bn.astamedia.dk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_EMAIL, // your SMTP username
      pass: process.env.SENDER_PASSWORD, // your SMTP password
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Test email from notify-on-sign-up`,
    text: `Testing email from notify-on-sign-up`,
  };

  // console.log(data);
  try {
    let { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (signUpError) {
      console.log("error", signUpError);
      return NextResponse.error(); // Ensure to return the NextResponse here
    }

    if (signUpData) {
      // redirect("/thanks-for-signing-up");
      return NextResponse.json({ data: signUpData });
    } else {
      return NextResponse.error(); // Handle no data case explicitly by returning an error
    }
  } catch (error) {
    console.error("Failed to send form data:", error);
    return NextResponse.error(); // Return an error NextResponse on catch
  }
}
