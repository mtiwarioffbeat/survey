import { RiCloseFill } from "react-icons/ri"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { useNavigation } from "@/hooks/useNavigation"
import { setSurvey } from "@/redux/SurveySlice/SurveySlice"
import { Survey } from "@/types/survey"
import { toast } from "react-toastify"
import { setViewMode } from "@/redux/DashboardSlice/DashboardSlice"

export default function SurveyList() {

    const surveys = useAppSelector((store) => store.surveys)
    const { router } = useNavigation()
    const dispatch = useAppDispatch()

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


    return (
        <div className="w-full">
            <div>
                <p className="text-base sm:text-lg md:text-xl font-bold">Survey List</p>
            </div>
            <hr className="text-gray-300 w-full" />
            <div className="w-full mt-3 overflow-x-auto">
                <table className="w-full border border-gray-300 mt-5 text-xs sm:text-sm md:text-base min-w-[600px]">
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="border border-gray-300 py-2 px-2 text-white">Name</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created_By</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created_At</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Is_Published</th>
                            <th className="border border-gray-300 py-2 px-2 text-white" colSpan={4}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {surveys.map((survey) => (
                            <tr key={survey.id}>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">
                                    {survey.title}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">
                                    {survey.createdBy}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">
                                    {survey.createdAt?.toString()}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">
                                    {`${survey.isPublished}`}
                                </td>
                                <td className="border border-gray-300 px-2 sm:px-3 py-2">
                                    <div className="flex items-center justify-around">
                                        <button
                                            className="px-2 sm:px-3 py-2 font-bold text-indigo-500 hover:underline"
                                            onClick={() => handleEdit(survey.id)}
                                        >
                                            <Link href="">Edit</Link>
                                        </button>
                                        <button
                                            className="px-2 sm:px-3 py-2 font-bold text-indigo-500 hover:underline"
                                            onClick={() => handleView(survey.id)}
                                        >
                                            <Link href="">View</Link>
                                        </button>
                                        <button className="px-2 sm:px-3 py-2 font-bold text-indigo-500 hover:underline">
                                            <Link href="">Publish</Link>
                                        </button>
                                        <button className="px-2 sm:px-3 py-2 font-bold text-indigo-500 flex items-center gap-1 hover:underline">
                                            <Link href="">Delete</Link>
                                        </button>
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