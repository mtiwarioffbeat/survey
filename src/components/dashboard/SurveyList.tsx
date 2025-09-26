import { RiCloseFill } from "react-icons/ri"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { useNavigation } from "@/hooks/useNavigation"
import { setSurvey } from "@/redux/SurveySlice/SurveySlice"
import { Survey } from "@/types/survey"
import { toast } from "react-toastify"
import { setGenModalConfirm, setViewMode } from "@/redux/DashboardSlice/DashboardSlice"

export default function SurveyList() {

    const surveys = useAppSelector((store) => store.surveys)
    const { router } = useNavigation()
    const dispatch = useAppDispatch()
    const { GenModalConfirm } = useAppSelector((store) => store.dashboard)

    //edit
    const handleEdit = (id: number | null) => {
        if (id === null) {
            console.log("ID is null. Cannot edit.");
            return
        }

        const surveyToEdit = surveys.find((s) => s.id === id);

        if (surveyToEdit) {
            dispatch(setSurvey(surveyToEdit));
            router.push(`/dashboard/survey/${id}/edit`);
        } else {
            // console.error(`Survey with ID ${id} not found.`);
            toast.error(`Survey with ID ${id} not found.`)
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

    return (
        <div className="w-full">
            <div>
                <p className="text-base sm:text-lg md:text-xl  font-bold">Survey List</p>
            </div>
            <hr className="text-gray-300 w-full" />
            <div className="w-full mt-3 overflow-x-auto">
                <table className="w-full min-w-[600px] border border-gray-300 mt-5 text-xs sm:text-sm md:text-base">
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="border border-gray-300 py-2 px-2 text-white">Name</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created By</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created At</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Is Published</th>
                            <th className="border border-gray-300 py-2 px-2 text-white" colSpan={4}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {surveys.map((survey) => (
                            <tr key={survey.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 whitespace-nowrap">
                                    {survey.title}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 whitespace-nowrap">
                                    {survey.createdBy}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 whitespace-nowrap">
                                    {survey.createdAt?.toString()}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600 whitespace-nowrap">
                                    {`${survey.isPublished}`}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2">
                                    <div className="flex flex-wrap gap-2 sm:g-0">
                                        {/* View */}
                                        <button
                                            className="px-2 sm:px-0 text-xs py-1 font-bold text-indigo-500 hover:underline"
                                            onClick={() => handleView(survey.id)}
                                        >
                                            <Link href="">View</Link>
                                        </button>

                                        {!survey.isPublished && (
                                            <>
                                                {/* Edit */}
                                                <button
                                                    className="px-2 sm:px-0 text-xs py-1 font-bold text-indigo-500 hover:underline"
                                                    onClick={() => handleEdit(survey.id)}
                                                >
                                                    <Link href="">Edit</Link>
                                                </button>

                                                {/* Publish */}
                                                <button
                                                    className="px-2 sm:px-0  py-1 font-bold text-indigo-500 hover:underline"
                                                    onClick={() => handlePublish(survey.id, survey.title)}
                                                >
                                                    <Link href="" className="text-xs">Publish</Link>
                                                </button>

                                                {/* Delete */}
                                                    <button
                                                        className="px-2 sm:px-0 text-xs py-1 font-bold text-indigo-500 flex items-center gap-1 hover:underline"
                                                        onClick={() => handleDelete(survey.id, survey.title)}
                                                    >
                                                        <Link href="">Delete</Link>
                                                    </button>
                                            </>
                                        )}
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