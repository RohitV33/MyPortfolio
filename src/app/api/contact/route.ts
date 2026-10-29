import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(200).optional().default("Portfolio Transmission"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  honeypot: z.string().max(0, "Spam detected").optional().default(""),
});

// In-memory sliding window rate limiter (max 5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const timestamps = (rateLimitMap.get(ip) || []).filter((time) => now - time < windowMs);
  if (timestamps.length >= maxRequests) {
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Transmission frequency exceeded. Please wait a few minutes before sending another inquiry.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = result.data;

    // Honeypot spam check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Transmission received." });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "verma61421st@gmail.com";

    // If SMTP credentials are not configured, run in Simulation Mode
    if (!smtpUser || !smtpPass) {
      console.log("==========================================");
      console.log("📬 CONTACT FORM SUBMISSION (SIMULATION MODE)");
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Date: ${new Date().toLocaleString()}`);
      console.log("------------------------------------------");
      console.log(message);
      console.log("==========================================");

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message received in local simulation mode. Thank you for connecting!",
      });
    }

    // Configure SMTP transport
    const transporter = nodemailer.createTransport({
      host: smtpHost || "smtp.gmail.com",
      port: parseInt(smtpPort || "465"),
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `New Portfolio Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; border: 1px solid #e5e5e5; border-radius: 12px; background: #fafafa;">
          <h2 style="color: #F5A623; margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #F5A623;">New Direct Transmission</h2>
          <p style="margin: 8px 0;"><strong>Sender:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #F5A623;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 16px; background-color: #ffffff; border-left: 4px solid #F5A623; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="margin-top: 24px; font-size: 11px; color: #888;">Transmitted from Rohit Verma's Portfolio.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      simulated: false,
      message: "Your message has been successfully transmitted. I will respond within 24 hours.",
    });
  } catch (error: unknown) {
    console.error("Error in contact route handler:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to transmit message.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
