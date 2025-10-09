import pool from "@/lib/db";
import { TOTP } from "totp-generator";
import base32 from "hi-base32";
import { PatchSurvey } from "@/types/survey";

export class UserDbService {
  public static async findUserByEmail(email: string) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT id, name, email FROM users WHERE email = $1 LIMIT 1",
        [email]
      );
      if (result.rowCount) {
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


const OTP_WINDOW = 180;
export class OtpService {

  public static async generateOtp(email: string): Promise<string> {
    // Encode email into base32 to make it a valid secret
    const secret = base32.encode(email).replace(/=+$/, ""); // strip padding

    const { otp } = await TOTP.generate(secret, {
      digits: 4,
      period: OTP_WINDOW,
    });

    return otp;
  }


  // Verify the provided OTP against the expected one

  public static async verifyOtp(email: string, otp: string): Promise<boolean> {
    const secret = base32.encode(email).replace(/=+$/, "");
    const { otp: expectedOtp } = await TOTP.generate(secret, {
      digits: 4,
      period: OTP_WINDOW,
    });
    console.log("expectedOtp", expectedOtp)
    return otp == expectedOtp;
  }
}



export class SurveyServices{
  public static async patchSurvey(data:PatchSurvey){
    console.log("data inside patch",data)
    const client = await pool.connect()
    try{

      let result
      if(data.to_delete){
        result =  await client.query(
          `Update survey SET is_Deleted=$1,is_opened_in_edit_mode=$3 WHERE id = $2 RETURNING id
          `,[data.to_delete,data.survey_id,false]
        )
      }
      else if(data.to_publish){
        result = await client.query(
          `Update survey SET is_Published=$1,is_opened_in_edit_mode=$3 WHERE id = $2 RETURNING id
          `,[data.to_publish,data.survey_id,false]
        )
      }
      
      const rows = await result?.rows[0]
      console.log("inside queries",rows)
      console.log("result====",result)
      return rows
    }finally{
      client.release()
    }

  }
}








// export class TokenService{
//   public static async CreateUserToken(session:Auth['userToken']){
//     const client = await pool.connect()

//     const result = await client.query(`Insert INTO user_tokens(token,user_id,is_used)
//       VALUES ($1,$2,$3) 
//       RETURNING *
//       `,
//       [session.token,session.user_id,session.is_used])


//       if(result.rowCount){
//         return result.rows[0]
//       }

//       return null
//   }
// }


