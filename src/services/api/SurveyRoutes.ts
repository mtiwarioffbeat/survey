import { PatchSurvey, Survey } from "@/types/survey";
import axios from "axios";
export class SurveyRoutes {
  // Signup POST
  public static async CreateSurvey(payload: Survey['Survey']) {

    console.log('payload', payload)

    try {
      const response = await axios.post("/api/survey", payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || "New survey creation failed",
      };
    }
  }


  public static async UpdateSurvey(payload: Survey['Survey']) {
    try {
      const response = await axios.put("/api/survey", payload)
      console.log("resposne in updat", response)
      return { success: true, data: response.data }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || "Updation failed"
      }
    }
  }
  
  // updating publish/delete check in survey
  public static async PatchSurvey(payload: PatchSurvey) {
    try {
      const response = await axios.patch("/api/survey", payload)
      console.log("response in patchsurvey", response)
      return { success: true, data: response.data }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.error || "Publish failed"
      }
    }
  }

  public  static async  GetSurveys(searchTerm = "") {
  try {
    const response = await axios.get("/api/survey", {
      params: {
        search: searchTerm,
      },
    });
    return { success: true, data: response.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.error || "cannot get surveys",
    };
  }
}


}





