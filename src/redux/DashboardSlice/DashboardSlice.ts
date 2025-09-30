import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";
import { fa } from "zod/locales";

const initialState:{
    menuOpen:boolean,
    session:Session,
    showModal:boolean,
    loading:boolean,
    viewMode:boolean,
    GenModalConfirm:GenModalConfirm,
    searchValue:string,
    searchValue:string
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
    searchValue:'',
    GenModalConfirm:{
        survey_id:-1,
        survey_name:'',
        to_delete:false,
        to_publish:false,
        text:''
    },
    searchValue:''
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
        },
        setSearchValue:(state,action:PayloadAction<string>)=>{
            state.searchValue = action.payload
        },
        setSearchValue:(state,action:PayloadAction<string>)=>{
            state.searchValue=action.payload
        },
        resetSession:(state)=>{
state.session = {id:null,name:null,email:null};
state.showModal =false;
state.GenModalConfirm ={survey_id:-1,survey_name:'',to_delete:false,to_publish:false,text:''};
        }
    }
})


export const {setMenuOpen,setSession,setShowModal,setLoading,setViewMode,setGenModalConfirm,resetSession,setSearchValue,setSearchValue} = DashboardSlice.actions
export default DashboardSlice.reducer