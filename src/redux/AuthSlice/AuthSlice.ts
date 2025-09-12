import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth } from "@/types/auth";


interface AuthState {
  text: string
  signup: Auth["signup"] | null
  login: Auth["login"] | null
  otp: Auth["otp"] | null,
  signupErrors:Auth["signup"] | null,
  loginErrors:Auth['login'] | null,
  loading:boolean,
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  text: "hello redux is working",
  signup: null,
  login: null,
  otp: null,
  signupErrors:null,
  loginErrors:null,
  loading:false,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: "auth",
   initialState,
  reducers: {
    setText:(state,action)=>{
        state.text = action.payload
    },
    setSignup:(state,action: PayloadAction<Auth["signup"]>)=>{
        state.signup = action.payload
    },
    setLogin:(state,action) =>{
      state.login = action.payload
    },
    setSignupErrors:(state,action:PayloadAction<Auth['signup']>)=>{
      state.signupErrors = action.payload
    },
    setLoginErrors:(state,action:PayloadAction<Auth['login']>)=>{
      state.loginErrors = action.payload
    },
    setLoading:(state,action:PayloadAction<boolean>)=>{
      state.loading = action.payload
    },
    setError:(state,action:PayloadAction<string | null>)=>{
      state.error = action.payload
    },
    setSuccess:(state,action:PayloadAction<boolean>)=>{
      state.success = action.payload
    }


  },
});

export const { setText,setSignup,setSignupErrors,setLoginErrors,setLoading,setError,setSuccess,setLogin } = authSlice.actions;
export default authSlice.reducer;
