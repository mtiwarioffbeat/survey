import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setGenModel, setLoading, setShowModal } from "@/redux/DashboardSlice/DashboardSlice";
import { setSurvey } from "@/redux/SurveySlice/SurveySlice";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { useNavigation } from "@/hooks/useNavigation";
import Spinner from "../Spinner";
import { Survey } from "@/types/survey";
import { NextResponse } from "next/server";


export const genModel = ()=>{
    const dispatch= useAppDispatch()
    const {genModel,loading} = useAppSelector((store)=>store.dashboard)

    const handleConfirm = () =>{
        
    }

    // close 
    const handleClose = () =>{
        dispatch(setGenModel(false))
    }
      return (
        <div className="fixed inset-0 z-[100] grid place-items-center " style={{ background: 'rgba(0,0,0,0.2)' }} >
            <div className="relative m-4 w-[80%] md:max-w-[50%] rounded-lg bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-slate-800">Enter Survey Details</h3>

                   

                    <div className="flex shrink-0 flex-wrap items-center justify-end pt-4">
                        <button
                            className="rounded-md border border-transparent px-4 py-2 text-center text-sm text-slate-600 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="ml-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                            onClick={handleConfirm}
                            // disabled={!title || !description || loading}
                        >
                            {loading ? <Spinner /> : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Modal = () => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const survey = useAppSelector((store) => store.survey)
    const { loading } = useAppSelector((store) => store.dashboard)
    const { router } = useNavigation()

    const handleConfirm = async () => {
        dispatch(setLoading(true))
        const newSurveyData:Survey['Survey'] = { ...survey, title: title, description: description };

        dispatch(setSurvey(newSurveyData));
        try{

            const res = await SurveyRoutes.CreateSurvey(newSurveyData)
            console.log("response in frontend",res.data.sur_id)            
            router.push(`/dashboard/survey/${res.data.sur_id}/edit`)
        } catch(err:unknown){
            console.log("error",err)
            return NextResponse.json({error:err})
        }
        dispatch(setLoading(false))
        dispatch(setShowModal(false))
        setTitle("");
        setDescription("");
        
    };
    
    const handleClose = () => {
        dispatch(setShowModal(false));
        dispatch(setLoading(false))
        
    };

    return (
        <div className="fixed inset-0 z-[100] grid place-items-center " style={{ background: 'rgba(0,0,0,0.2)' }} >
            <div className="relative m-4 w-[80%] md:max-w-[50%] rounded-lg bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-slate-800">Enter Survey Details</h3>

                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-600 focus:outline-none"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                            className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-600  focus:outline-none"
                        ></textarea>
                    </form>

                    <div className="flex shrink-0 flex-wrap items-center justify-end pt-4">
                        <button
                            className="rounded-md border border-transparent px-4 py-2 text-center text-sm text-slate-600 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="ml-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                            onClick={handleConfirm}
                            disabled={!title || !description || loading}
                        >
                            {loading ? <Spinner /> : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
