import { NextResponse } from "next/server"; // Import NextResponse
import nodemailer from "nodemailer";

export async function POST() {
  try {
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
      subject: "Test Email",
      text: "This is a test email",
    };

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
    // Log the error for debugging purposes
    console.error("Error sending email:", error);

    // Check if the error is an instance of Error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    // Return an error response with the error message
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
