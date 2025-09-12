import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const DashboardSlice = createSlice({
    name:"dashboard",
    initialState:{
        menuOpen:false
    },
    reducers:{
        setMenuOpen:(state,action:PayloadAction<boolean>)=>{
            state.menuOpen = action.payload
        }
    }
})


export const {setMenuOpen} = DashboardSlice.actions
export default DashboardSlice.reducer