'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setMenuOpen, setViewMode } from "@/redux/DashboardSlice/DashboardSlice";
import { FaFileAlt, FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Tooltip from "./Tooltip";
import { usePathname } from "next/navigation";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { useNavigation } from "@/hooks/useNavigation";
import { setLoading } from "@/redux/AuthSlice/AuthSlice";
import Spinner from "./Spinner";
import { resetSurvey } from "@/redux/SurveySlice/SurveySlice";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { getSocket } from "@/utils/socket";
import Aside from "./Aside";
import { resetSession } from "@/redux/DashboardSlice/DashboardSlice";

export default function Navbar() {

    const [profileOpen, setProfileOpen] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false)
    const { menuOpen, loading, viewMode } = useAppSelector((store) => store.dashboard)
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const survey = useAppSelector((store) => store.survey)
    const {session} = useAppSelector((store)=>store.dashboard)
    const socket = getSocket()
    const { router } = useNavigation();
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleLogout = async () => {
        try {
            dispatch(resetSession());
            dispatch(resetSurvey());
            localStorage.clear();
            sessionStorage.clear();
            await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };


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
                socket.emit('survey_patch', data)
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
            <div className=" flex flex-wrap  items-centere justify-between mx-auto w-[90%] px-3">
                {/* hamburgur menu */}
            
                    {/* Left logo */}
               

                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <FaFileAlt className="text-3xl text-indigo-700 cursor-pointer" />
                        <span className="self-center text-2xl ">Surveys</span>
                    </a>

                
                    {/* Right profile + menu toggle */}

                    <div className=" flex items-center gap-3 relative" ref={dropdownRef}>
                        {pathName === "/dashboard" && (
                            <>
                                <div className="hidden sm:flex flex-col text-right">
                                    <p className="text-sm font-semibold">{session?.name}</p>
                                </div>

                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="focus:outline-none hidden sm:block"
                                >
                                    <FaUserCircle className="text-3xl text-indigo-600 cursor-pointer" />
                                </button>

                                {profileOpen && (
                                    <div className="absolute top-12 right-0 w-40 bg-white shadow-md z-50 rounded-md overflow-hidden">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => dispatch(setMenuOpen(!menuOpen))}
                            className="p-2 rounded-md border border-gray-200 sm:hidden"
                        >
                            <IoMenu className="text-2xl" />
                        </button>
                    </div>
              
                {/* Mobile Sidebar/Menu */}
                {menuOpen && (
                    <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-3">
                        {/* Show Aside sidebar */}
                        <Aside />
                        {pathName !== "/dashboard" && !viewMode && (
                            <>
                                <button
                                    className="flex items-center gap-2 text-indigo-600 hover:bg-indigo-50 w-full px-3 py-2 rounded-md"
                                    onClick={handleView}
                                >
                                    <MdOutlineRemoveRedEye size={20} /> Preview
                                </button>

                                <button
                                    type="button"
                                    className="w-full text-green-600 font-medium rounded-md text-sm px-3 py-2 border flex justify-center hover:bg-green-600 hover:text-white"
                                    onClick={handleSave}
                                >
                                    {loading ? <Spinner /> : "Save"}
                                </button>

                                <button
                                    type="button"
                                    className="w-full text-indigo-600 font-medium rounded-md text-sm px-3 py-2 border flex justify-center hover:bg-indigo-600 hover:text-white"
                                    onClick={handlePublish}
                                    disabled={publishLoading}
                                >
                                    {publishLoading ? <Spinner /> : "Publish"}
                                </button>
                            </>
                        )}
                    </div>
                )}
                

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
                        <button type="button" className="font-medium rounded-lg text-sm px-3 py-2.5 text-center  border-1 border-white  bg-green-600 text-white flex gap-2 cursor-pointer  hover:border-green-600 hover:text-green-600 hover:bg-white transition-all duration-300"
                            onClick={handleSave}
                        > {loading ? <Spinner /> : "Save"}</button>

                        {/* publish */}
                        <button type="button" className="font-medium rounded-lg text-sm px-3 py-2.5 text-center  border-1  bg-indigo-600 text-white flex gap-2 cursor-pointer hover:bg-white hover:border-indigo-600 hover:text-indigo-600" onClick={handlePublish} disabled={publishLoading}> {publishLoading ? <Spinner /> : "Publish"}</button>

                    </div>
                }

            </div>
        </nav>


    )
}