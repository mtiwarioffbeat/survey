import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
  name: "auth",
  initialState: {
   text:"hello redux is working"
   
  },
  reducers: {
    setText:(state,action)=>{
        state.text = action.payload
    }
  },
});

export const { setText } = authSlice.actions;
export default authSlice.reducer;
