import { getSession } from "@/lib/getSession";
import { Auth } from "@/types/auth";
import { Survey } from "@/types/survey";
import axios from "axios";
import { useEffect } from "react";

export class SurveyRoutes {
  // Signup POST
  public static async CreateSurvey(payload:Survey['Survey']) {
   
    const formdata = {
      name: payload?.name,
      // email: payload?.email,
    };
    try {
      const response = await axios.post("/api/survey", formdata);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || "Signup failed",
      };
    }
  }

 

}





