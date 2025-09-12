import Mailer from "@/services/db/nodemailer";
import { OtpService, UserDbService } from "@/services/db/UserDbService"
import { NextResponse } from "next/server"


export async function POST(req:Request){
    const {email} = await req.json()

    if(!email){
        return NextResponse.json({error:"Email is required"},{status:400})
    } 
    
    // user present?
    const userPresent = await UserDbService.findUserByEmail(email)
        if(!userPresent){
            return NextResponse.json({success:false,status:400, error:"User does not exist, try signup" }) 
        }
    

    const generatedOtp = await OtpService.generateOtp(email);
    if(generatedOtp){
        const emailSent = Mailer(email,generatedOtp)
    }
    console.log(`otp for ${email}=${generatedOtp}`)

    return NextResponse.json({success:true,status:200, message:"OTP sent successfully"})
}