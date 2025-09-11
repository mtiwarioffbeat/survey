import { NextResponse } from "next/server";
import { TOTP } from "totp-generator";
import base32 from "hi-base32"; // Required for base32 encoding
import { OtpService } from "@/services/db/UserDbService";
import Mailer from "@/services/db/nodemailer";




// POST: Generate or Verify OTP
export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // If OTP is provided, verify it
  if (otp) {
    const isValid = await OtpService.verifyOtp(email, otp);

    if (isValid) {
      return NextResponse.json({ success: true, message: "OTP verified" });
    } else {
      return NextResponse.json(
        { success: false, error:"Invalid or expired OTP" },
        { status: 401 }
      );
    }
  }

  // generate a new OTP
  const generatedOtp = await OtpService.generateOtp(email);
   if(generatedOtp){
        const emailSent = Mailer(email,generatedOtp)
      }
  console.log(`OTP for ${email} = ${generatedOtp}`);

  
  return NextResponse.json({success:200 , message: "OTP sent successfully" });
}
