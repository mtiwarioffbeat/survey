import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import Spinner from "../Spinner"
import { setSurveyDeleteConfirm } from "@/redux/DashboardSlice/DashboardSlice"

export const GenModel = ()=>{
    const dispatch= useAppDispatch()
    const {loading,surveyDeleteConfirm} = useAppSelector((store)=>store.dashboard)

    const handleConfirm = () =>{

    }

    // close 
    const handleClose = () =>{
        dispatch(setSurveyDeleteConfirm({...surveyDeleteConfirm,delete:true}))
    }

    
  if (!surveyDeleteConfirm.delete) {
    return null; // nothing rendered
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

