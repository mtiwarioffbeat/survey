import Mailer from "@/services/db/nodemailer";
import { OtpService } from "@/services/db/UserDbService"
import { NextResponse } from "next/server"


export async function POST(req:Request){
    const {email} = await req.json()

    if(!email){
        return NextResponse.json({error:"Email is required"},{status:400})
    }

    const generatedOtp = await OtpService.generateOtp(email);
    if(generatedOtp){
        const emailSent = Mailer(email,generatedOtp)
    }
    console.log(`otp for ${email}=${generatedOtp}`)

    return NextResponse.json({success:200, message:"OTP sent successfully"})
}