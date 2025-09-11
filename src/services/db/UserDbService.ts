import pool from "@/lib/db";
import { TOTP } from "totp-generator";
import base32 from "hi-base32";

export class UserDbService {
  public static async findUserByEmail(email: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT id, name, email FROM users WHERE email = $1 LIMIT 1",
        [email]
      );

      if ((result.rowCount ?? 0)) {
  return result.rows[0]; // user exists
}
      return null; // user does not exist
    } finally {
      client.release();
    }
  }

  public static async createUser(name: string, email: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO users (name, email, created_at, is_deleted, is_active) 
         VALUES ($1, $2, NOW(), FALSE, False)
         RETURNING id, name, email, created_at`,
        [name, email]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

}




const OTP_WINDOW = 5; // 3 minutes
export class OtpService {
  
  //Generate a 4-digit OTP for a given email
  
  public static async generateOtp(email: string): Promise<string> {
    // Encode email into base32 to make it a valid secret
    const secret = base32.encode(email).replace(/=+$/, ""); // strip padding

    const { otp } = await TOTP.generate(secret, {
      digits: 4,
      period: OTP_WINDOW,
    });

    console.log("OTP+++>",otp)

    return otp;
  }

  
  // Verify the provided OTP against the expected one
 
  public static async verifyOtp(email: string, otp: string): Promise<boolean> {
    const secret = base32.encode(email).replace(/=+$/, "");

    const { otp: expectedOtp } = await TOTP.generate(secret, {
      digits: 4,
      period: OTP_WINDOW,
    });

    return otp === expectedOtp;
  }
}
