'use server';

import { NextResponse } from "next/server";
import { OtpService, UserDbService } from "@/services/db/UserDbService";
import main from "@/services/db/nodemailer";
import Mailer from "@/services/db/nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email }:{name:string, email:string} = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name & email are required" },
        { status: 400 }
      );
    }

    // checkig existing user
      const existingUser = await UserDbService.findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists. Please login instead." },
        { status: 400 }
      );
    }

    // create user
    const result = await UserDbService.createUser(name, email);

    if (result.exists) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }
    // generate otp
    const generated_OTP = await OtpService.generateOtp(email)
    // console.log('generated_OTP',generated_OTP)
    if(generated_OTP){
      const emailSent = Mailer(email,generated_OTP)
    }
    return NextResponse.json(
      { message: "Signup successful", user: result.user },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json(
//         { error: "Email is required" },
//         { status: 400 }
//       );
//     }

//     const user = await UserDbService.findUserByEmail(email);

//     if (user) {
//       return NextResponse.json(
//         { exists: true, message: "User already exists, try login" },
//         { status: 400 }
//       );
//     }
//     const res=  main();
//     console.log("res", res )
//     return NextResponse.json(
//       { exists: false, message: "Email is available" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("GET signup check error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }