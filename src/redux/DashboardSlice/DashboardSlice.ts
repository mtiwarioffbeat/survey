import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{
    menuOpen:boolean,
    session:Session,
    showModal:boolean,
    loading:boolean
} = {
    menuOpen:false,
    session:{
        id:null,
        name:null,
        email:null,
    },
    showModal:false,
    loading:false
}

const createSurvey = createAsyncThunk('surveys/createSurvey',
    async () =>{
        
    }
)

const DashboardSlice = createSlice({
    name:"dashboard",
   initialState,
    reducers:{
        setMenuOpen:(state,action:PayloadAction<boolean>)=>{
            state.menuOpen = action.payload
        },
        setSession:(state,action:PayloadAction<Session>)=>{
            state.session = action.payload
        },
        setShowModal:(state,action:PayloadAction<boolean>)=>{
            state.showModal = action.payload
        },
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        }

    }
})


export const {setMenuOpen,setSession,setShowModal,setLoading} = DashboardSlice.actions
export default DashboardSlice.reducer