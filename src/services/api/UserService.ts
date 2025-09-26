import { Auth } from "@/types/auth";
import axios from "axios";

export class UserService {
  // Signup POST
  public static async SignupUser(payload: Auth["signup"] | null) {
    const formdata = {
      name: payload?.name,
      email: payload?.email,
    };
    try {
      const response = await axios.post("/api/auth/signup", formdata);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || "Signup failed",
      };
    }
  }

  // Login POST
  public static async LoginUser(payload: Auth['login']) {
    const formData = {
      email: payload.email,

    }
    try {
      const response = await axios.post("/api/auth/login", formData);
      console.log("response present in userService", response)
      return response.data
    } catch (err: any) {
      return {
        message: err.response?.data?.error || "Login failed",
      };
    }
  }

  // verify POST
  public static async OtpVerify(payload: Auth['verify']) {
    const formData = {
      email: payload.email,
      otp: payload.otp
    }
    try {
      const response = await axios.post('/api/auth/verify', formData)
      console.log("response present in userService", response)
      return response.data
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.error || "verification faild"
      }
    }
  }

  public static async ResendOtp(payload: string | undefined) {
    if (!payload) {
      return {
        success: false,
        message: "Email address is missing."
      };
    }

    const formData = {
      email: payload,
    };
    try {
      const response = await axios.post('/api/auth/verify', formData);
      console.log("response present in userService", response.data);
      return response.data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.error || "OTP resend failed, Please try again later"
      };
    }
  }


  // Check if user exists by email (GET)
  public static async CheckUserByEmail(email: string) {
    try {
      const response = await axios.get(`/api/auth/signup?email=${encodeURIComponent(email)}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data?.error || "Failed to check email",
      };
    }
  }
 
}

