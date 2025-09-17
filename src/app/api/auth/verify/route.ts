import { NextResponse } from "next/server";
import { TOTP } from "totp-generator";
import base32 from "hi-base32"; // Required for base32 encoding
import { OtpService, TokenService, UserDbService } from "@/services/db/UserDbService";
import Mailer from "@/services/db/nodemailer";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { Auth } from "@/types/auth";
// it generater or verify otp
export async function POST(req: Request) {
  const { email, otp } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }


  // if otp is provided, verifing it
  if (otp) {
    console.log(otp)
    const isValid = await OtpService.verifyOtp(email, otp);
    if (isValid) {

      // get user
      const user = await UserDbService.findUserByEmail(email);

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" } // 1 day expiry
      );

      // Set cookie
      const cookieStore = await cookies();

      cookieStore.set("session", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      // const session: Auth['userToken'] = {
      //   token: token,
      //   is_used: true,
      //   user_id: user.id
      // }

      // const userSessioninDB = TokenService.CreateUserToken(session)
      // console.log(userSessioninDB, "token saved in backend")

      return NextResponse.json({ success: true, message: "OTP verified", token: token });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }
  }

  // generateging a new otpp
  const generatedOtp = await OtpService.generateOtp(email);
  if (generatedOtp) {
    const emailSent = Mailer(email, generatedOtp)
  }
  // console.log(`OTP for ${email} = ${generatedOtp}`);


  // console.log("inside verify route1", user)
  return NextResponse.json({ success: 200, message: "OTP sent successfully" });
}
