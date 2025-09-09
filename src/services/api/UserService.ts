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
  public static async LoginUser(payload: any) {
    try {
      const response = await axios.post("/api/auth/login", {
        email: payload.email,
        password: payload.password,
      });
      return { success: true, data: response.data };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.error || "Login failed",
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
