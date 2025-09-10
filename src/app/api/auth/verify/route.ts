import { NextResponse } from "next/server";
import { TOTP } from "totp-generator";

const OTP_WINDOW = 180; // 3 minutes

// Generate OTP
export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Use email as secret (⚠️ better to hash/encode in production)
  const secret = email;

  // Generate OTP valid for 3 minutes
  const { otp } = await TOTP.generate(secret, {
    digits: 6,
    period: OTP_WINDOW,
  });

  console.log(`OTP for ${email} = ${otp}`);

  // TODO: send via Nodemailer/SendGrid/etc.
  return NextResponse.json({ message: "OTP sent successfully" });
}

// Verify OTP
export async function PUT(req: Request) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
  }

  const secret = email;

  // Regenerate expected OTP for the same period
  const { otp: expectedOtp } = await TOTP.generate(secret, {
    digits: 6,
    period: OTP_WINDOW,
  });

  if (otp === expectedOtp) {
    return NextResponse.json({ success: true, message: "OTP verified" });
  }

  return NextResponse.json(
    { success: false, message: "Invalid or expired OTP" },
    { status: 401 }
  );
}
