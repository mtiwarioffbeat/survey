import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{
    menuOpen:boolean,
    session:Session
} = {
    menuOpen:false,
    session:{
        id:null,
        name:null,
        email:null
    }
}

const DashboardSlice = createSlice({
    name:"dashboard",
   initialState,
    reducers:{
        setMenuOpen:(state,action:PayloadAction<boolean>)=>{
            state.menuOpen = action.payload
        },
        setSession:(state,action:PayloadAction<Session>)=>{
            state.session = action.payload
        }

    }
})


export const {setMenuOpen,setSession} = DashboardSlice.actions
export default DashboardSlice.reducer