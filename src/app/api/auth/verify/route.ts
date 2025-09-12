import { NextResponse } from "next/server";
import { TOTP } from "totp-generator";
import base32 from "hi-base32"; // Required for base32 encoding
import { OtpService } from "@/services/db/UserDbService";
import Mailer from "@/services/db/nodemailer";




// it generater or verify otp
export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // if otp is provided, verifing it
  if (otp) {
    const isValid = await OtpService.verifyOtp(email, otp);
    console.log("inside verify route",isValid)
    if (isValid) {
      return NextResponse.json({ success: true, message: "OTP verified" });
    } else {
      return NextResponse.json(
        { success: false, error:"Invalid or expired OTP" },
        { status: 401 }
      );
    }
  }

  // generateging a new otpp
  const generatedOtp = await OtpService.generateOtp(email);
   if(generatedOtp){
        const emailSent = Mailer(email,generatedOtp)
      }
  console.log(`OTP for ${email} = ${generatedOtp}`);

  
  return NextResponse.json({success:200 , message: "OTP sent successfully" });
}
