import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import Spinner from "../Spinner"
import { setGenModalConfirm, setLoading } from "@/redux/DashboardSlice/DashboardSlice"
import { toast } from "react-toastify"
import { SurveyRoutes } from "@/services/api/SurveyRoutes"
import { getSocket } from "@/utils/socket"

 const GenModal = ()=>{
    const dispatch= useAppDispatch()
    const {loading,GenModalConfirm} = useAppSelector((store)=>store.dashboard)
    const socket = getSocket();
    
    const handleConfirm = async () =>{
        dispatch(setLoading(true))
        const data = {
            survey_id:GenModalConfirm.survey_id,
            to_publish:GenModalConfirm.to_publish,
            to_delete:GenModalConfirm.to_delete,
        }
        try{
            const res = await SurveyRoutes.PatchSurvey(data)

            if(res.success){
                // socket emitt
                socket.emit('survey_patch',data)
                toast.success(res.data?.message)
                 
            }
            dispatch(setLoading(false))
             dispatch(setGenModalConfirm({...GenModalConfirm,to_delete:false,survey_id:-1,survey_name:'',to_publish:false}))
            return
        } catch(error:any){
            console.log("aaaaaw",error)
            toast.error(error.data?.message)
        }
    }

    // close 
    const handleCancel = () =>{
        dispatch(setLoading(false))
        dispatch(setGenModalConfirm({...GenModalConfirm,to_delete:false,survey_id:-1,survey_name:'',to_publish:false}))
    }
      return (
        <div className="fixed inset-0 z-[100] grid place-items-center " style={{ background: 'rgba(0,0,0,0.2)' }} >
            <div className="relative m-4 w-[80%] md:max-w-[50%] rounded-lg bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-slate-800">Are you sure you want to  <span className="text-red-600">{GenModalConfirm.to_delete ? "Delete":"Publish"} {GenModalConfirm.survey_name}</span>?</h3>            

                    <div className="flex shrink-0 flex-wrap items-center justify-end pt-4">
                        <button
                            className="rounded-md border border-transparent px-4 py-2 text-center text-sm text-slate-600 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="ml-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                            onClick={handleConfirm}
                        >
                            {loading ? <Spinner /> : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenModal