import { NextRequest, NextResponse } from "next/server"; // Import NextResponse
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    postcode,
    contractMonths,
    acquisitionValue,
  } = body;

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
    subject: `New leasing request from ${firstName} ${lastName}`,
    text: `Details:\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}, ${postcode}\nContract Months: ${contractMonths}\nAcquisition Value (DKK): ${acquisitionValue}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    // Return a success response
    return new NextResponse(
      JSON.stringify({
        message: "Email sent successfully",
        messageId: info.messageId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error sending email:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return new NextResponse(
      JSON.stringify({
        error: "Failed to send email",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
