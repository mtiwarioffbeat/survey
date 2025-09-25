import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:{
    menuOpen:boolean,
    session:Session,
    showModal:boolean,
    loading:boolean,
    viewMode:boolean,
    GenModalConfirm:GenModalConfirm 
} = {
    menuOpen:false,
    session:{
        id:null,
        name:null,
        email:null,
    },
    showModal:false,
    loading:false,
    viewMode:false,
    GenModalConfirm:{
        survey_id:-1,
        survey_name:'',
        to_delete:false,
        to_publish:false,
        text:''
    }
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
        },
        setViewMode:(state,action:PayloadAction<boolean>)=>{
            state.viewMode = action.payload
        },
        setGenModalConfirm:(state,action:PayloadAction<GenModalConfirm>)=>{
            state.GenModalConfirm = action.payload
        }
       
    }
})


export const {setMenuOpen,setSession,setShowModal,setLoading,setViewMode,setGenModalConfirm} = DashboardSlice.actions
export default DashboardSlice.reducer