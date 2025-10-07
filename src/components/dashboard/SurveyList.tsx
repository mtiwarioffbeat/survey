import { RiCloseFill } from "react-icons/ri"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { useNavigation } from "@/hooks/useNavigation"
import { setSurvey } from "@/redux/SurveySlice/SurveySlice"
import { Survey } from "@/types/survey"
import { toast } from "react-toastify"
import { setGenModalConfirm, setViewMode } from "@/redux/DashboardSlice/DashboardSlice"
import { useEffect } from "react"
import { getSocket } from "@/utils/socket"
import { setSurveys } from "@/redux/SurveysSlice/SurveysSlice"
import { SurveyRoutes } from "@/services/api/SurveyRoutes"


export default function SurveyList() {

    const surveys = useAppSelector((store) => store.surveys)

    const { searchValue } = useAppSelector((store) => store.dashboard)
    const { router } = useNavigation()
    const dispatch = useAppDispatch()
    const { GenModalConfirm } = useAppSelector((store) => store.dashboard)
    const socket = getSocket()

    // socket listener
    useEffect(() => {
        socket.on("get_all_surveys", (allSurveys) => {
            console.log("Received surveys:", allSurveys);
            dispatch(setSurveys(allSurveys));
        });

        socket.on("survey_patch", async () => {
            const get_all_surveys = await SurveyRoutes.GetSurvey()
            dispatch(setSurveys(get_all_surveys.data?.data));

        })
        return () => {
            socket.off("get_all_surveys");
            socket.off("survey_patch");
        };
    }, [socket]);

    //edit
    // const handleEdit = (id: number | null) => {
    //     if (id === null) {
    //         console.log("ID is null. Cannot edit.");
    //         return
    //     }

    //     const surveyToEdit = surveys.find((s) => s.id === id);

    //     if (surveyToEdit) {
    //         dispatch(setSurvey(surveyToEdit));
    //         router.push(`/dashboard/survey/${id}/edit`);
    //     } else {
    //         // console.error(`Survey with ID ${id} not found.`);
    //         toast.error(`Survey with ID ${id} not found.`)
    //     }
    // };
    const handleEdit = (survey_id: number, survey_name: string) => {
        if (!survey_id) {
            toast.error("id is not present");
            return;
        }
        const surveyToEdit = surveys.find((s) => s.id === survey_id);

        if (surveyToEdit) {
            dispatch(
            setGenModalConfirm({
                ...GenModalConfirm,
                survey_name,
                survey_id,
                to_edit: true, // 🆕 new flag
            })
        );
            dispatch(setSurvey({...surveyToEdit,isOpenedInEditMode:true}));
            router.push(`/dashboard/survey/${survey_id}/edit`);
        } else {
            // console.error(`Survey with ID ${id} not found.`);
            toast.error(`Survey with ID ${survey_id} not found.`)
        }
        
    };

    // view
    const handleView = (survey_id: number) => {
        if (survey_id == null) {
            console.log("id is null")
            return
        }
        const surveyToView = surveys.find((s) => s.id == survey_id)

        if (surveyToView) {
            dispatch(setSurvey(surveyToView))
            dispatch(setViewMode(true))
            router.push(`/dashboard/survey/${survey_id}/preview`)
        } else {
            // console.error(`Survey with ID ${id} not found.`);
            toast.error(`Survey with ID ${survey_id} not found.`)
        }
    }

    //delete
    const handleDelete = (survey_id: number, survey_name: string) => {
        if (survey_id == null) {
            toast.error("id is not present")
        }
        dispatch(setGenModalConfirm({ ...GenModalConfirm, to_delete: true, survey_name: survey_name, survey_id: survey_id }))
    }

    //publish
    const handlePublish = (survey_id: number, survey_name: string) => {
        if (survey_id == null) {
            toast.error("id is not present")
        }
        dispatch(setGenModalConfirm({ ...GenModalConfirm, survey_name: survey_name, survey_id: survey_id, to_publish: true }))
    }


    const handleCopyUrl = async (id: number) => {
        console.log("url", process.env.NEXT_PUBLIC_RESPONDER_URL)
        try {
            // const responderUrl = `http://localhost:3000/surveys/${id}`
            const responderUrl = `${process.env.NEXT_PUBLIC_RESPONDER_URL}/${id}`
            // const responderUrl = `https://cqgdsgvd-3000.inc1.devtunnels.ms/surveys/${id}`
            await navigator.clipboard.writeText(responderUrl)
            toast.dark('Copied to clipboard')
        } catch (err) {
            toast.error("Failed to copy URL")
        }
    }

    return (
        <div className="w-full">

            <div className="w-full mt-3 overflow-x-auto">
                <table className="w-full border border-gray-300 mt-5 text-xs sm:text-sm md:text-base min-w-[600px]">
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="border border-gray-300 py-2 px-2 text-white">Name</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created by</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created at</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Published</th>
                            <th className="border border-gray-300 py-2 px-2 text-white" colSpan={4}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {surveys.map((survey) => (
                            <tr key={survey.id}>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 text-center">
                                    {survey.title}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 text-center">
                                    {survey.createdBy}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 text-center">
                                    {survey.createdAt?.toString()}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 text-center">
                                    {`${survey.isPublished}`}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2">
                                    <div className="flex items-center justify-center gap-1">
                                        {/* View */}
                                        <button
                                            className=" sm:px-3 font-bold text-indigo-500 border-1 border-gray-300 px-2 py-2 hover:bg-indigo-50 rounded-sm"
                                            onClick={() => handleView(survey.id)}
                                        >
                                            <Link href="">View</Link>
                                        </button>
                                        {
                                            survey.isPublished && <button onClick={() => handleCopyUrl(survey.id)} className='cursor-pointer  font-bold text-indigo-500 border-1 border-gray-300 px-2 py-2 hover:bg-indigo-50 rounded-sm'>
                                                Copy responder Link
                                            </button>
                                        }
                                    {(!survey.isPublished && !survey.isOpenedInEditMode)&&
                                            <div className="flex items-center gap-1">

                                                <button
                                                    className="sm:px-3 font-bold text-indigo-500 border-1 border-gray-300 px-2 py-2 hover:bg-indigo-50 rounded-sm"
                                                    onClick={() => handleEdit(survey.id, survey.title)}
                                                >
                                                    <Link href="">Edit</Link>
                                                </button>

                                                {/* publish */}
                                                <button className="sm:px-3  font-bold text-indigo-500 border-1 border-gray-300 px-2 py-2 hover:bg-indigo-50 rounded-sm" onClick={() => handlePublish(survey.id, survey.title)}>
                                                    <Link href="">Publish</Link>
                                                </button>
                                                {/* delete */}
                                                <button className="px-2 sm:px-3 py-2 font-bold text-indigo-500 flex items-center gap-1  border-1 border-gray-300 hover:bg-indigo-50 rounded-sm" onClick={() => handleDelete(survey.id, survey.title)}>
                                                    <Link href="">Delete</Link>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}