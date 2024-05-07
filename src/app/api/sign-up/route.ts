import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
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

  try {
    let { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (signUpError) {
      console.log("error", signUpError);
      return NextResponse.error();
    }

    if (signUpData) {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: `New sign up at staging.bankingnorth.com`,
        text: `Sign up from ${data.email}`,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);
      return NextResponse.json({ data: signUpData });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error("Failed to send form data:", error);
    return NextResponse.error();
  }
}
