'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setMenuOpen, setViewMode } from "@/redux/DashboardSlice/DashboardSlice";
import { FaFileAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdOutlineRemoveRedEye, MdPublishedWithChanges } from "react-icons/md";
import Tooltip from "./Tooltip";
import { usePathname } from "next/navigation";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { useNavigation } from "@/hooks/useNavigation";
import { setLoading } from "@/redux/AuthSlice/AuthSlice";
// import { setLoading } from "@/redux/DashboardSlice/DashboardSlice";
import Spinner from "./Spinner";
import { resetSurvey, setSurvey } from "@/redux/SurveySlice/SurveySlice";
import { toast } from "react-toastify";
import { useState } from "react";

export default function DashboardNav() {
    const [publishLoading, setPublishLoading] = useState(false)
    const { menuOpen, loading, viewMode } = useAppSelector((store) => store.dashboard)
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const survey = useAppSelector((store) => store.survey)
    const { router } = useNavigation()
    
    const handleSave = async () => {
        dispatch(setLoading(true))
        let new_survey = { ...survey, isOpenedInEditMode: false }
        try {
            const res = await SurveyRoutes.UpdateSurvey(new_survey)
            console.log("res in anvbar", res)

            if (res.success) {
                dispatch(resetSurvey())
                router.push('/dashboard')
            }
        } catch (err: any) {
            return { success: false, error: "Bad request", status: 400 }
        }

        dispatch(setLoading(false))
    }

    const handleView = () => {
        // const surveyToView = surveys.find((s) => s.id == survey_id)

        if (survey) {
            // dispatch(setSurvey(surveyToView))
            dispatch(setViewMode(true))
            console.log(survey.id)
            router.push(`/dashboard/survey/${survey.id}/preview`)
        } else {
            // console.error(`Survey with ID ${id} not found.`);
            toast.error(`Survey not found.`)
        }
    }


    const handlePublish = async () => {
        setPublishLoading(true)

        if (!survey.id) {
            return toast.error("id is required")
        }
        let data = {
            survey_id: survey?.id,
            to_publish: true,
            to_delete: false
        }

        try {
            const res = await SurveyRoutes.PatchSurvey(data)
            console.log("response in genModal", res)
            if (res.success) {

                toast.success(res.data?.message)

            }
            router.push('/dashboard')
            setPublishLoading(false)
            return
        } catch (error: any) {
            console.error("aaaaaw", error)
            toast.error(error)
        }
    }

    return (

        <nav className=" border-gray-200  bg-white shadow w-full py-3">
            <div className=" flex flex-wrap  items-centere justify-between mx-auto sm:w-[90%]">
                {/* hamburgur menu */}
                <div className="flex">
                    <button
                        onClick={() => dispatch(setMenuOpen(!menuOpen))}
                        className="   rounded-lg  cursor-pointer mr-2"
                    >
                        <IoMenu className="text-2xl" />
                    </button>

                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FaFileAlt className="text-3xl text-indigo-700 cursor-pointer" />
                        <span className="self-center text-2xl ">Surveys</span>
                    </a>

                </div>

                {/*button features for survey page  */}
                {
                    pathName != "/dashboard" && !viewMode &&
                    <div className="flex items-center justify-center gap-3">
                        {/* view */}
                        <button className="flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group" onClick={handleView} >

                            <MdOutlineRemoveRedEye size={24} className="text-indigo-600" />
                            <Tooltip text="Preview" />
                        </button>
                        {/* save */}
                        <button type="button" className="text-green-600 font-medium rounded-lg text-sm px-3 py-2.5 text-center  border-1  hover:bg-green-600 hover:text-white flex gap-2 cursor-pointer"
                            onClick={handleSave}
                        > {loading ? <Spinner /> : "Save"}</button>
                        {/* publish */}
                        <button type="button" className="text-indigo-600 font-medium rounded-lg text-sm px-3 py-2.5 text-center  border-1  hover:bg-indigo-600 hover:text-white flex gap-2 cursor-pointer " onClick={handlePublish} disabled={publishLoading}> {publishLoading ?<Spinner/>:"Publish"}</button>

                    </div>
                }

            </div>
        </nav>


    )
}