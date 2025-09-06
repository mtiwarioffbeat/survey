import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "@/types/auth";


interface AuthState {
  text: string
  signup: Auth["signup"] | null
  login: Auth["login"] | null
  otp: Auth["otp"] | null
}

const initialState: AuthState = {
  text: "hello redux is working",
  signup: null,
  login: null,
  otp: null,
}

const authSlice = createSlice({
  name: "auth",
   initialState,
  reducers: {
    setText:(state,action)=>{
        state.text = action.payload
    },
    setSignup:(state,action)=>{
        state.signup = action.payload
    }

  },
});

export const { setText,setSignup } = authSlice.actions;
export default authSlice.reducer;
