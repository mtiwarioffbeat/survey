import { RiCloseFill } from "react-icons/ri"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { useNavigation } from "@/hooks/useNavigation"
import { setSurvey } from "@/redux/SurveySlice/SurveySlice"
import { toast } from "react-toastify"
import { setGenModalConfirm, setViewMode } from "@/redux/DashboardSlice/DashboardSlice"

export default function SurveyList() {
    const surveys = useAppSelector((store) => store.surveys)
    const { searchValue } = useAppSelector((store) => store.dashboard)
    const { router } = useNavigation()
    const dispatch = useAppDispatch()
    const { GenModalConfirm } = useAppSelector((store) => store.dashboard)

    // edit
    const handleEdit = (id: number | null) => {
        if (id === null) {
            console.log("ID is null. Cannot edit.")
            return
        }

        const surveyToEdit = surveys.find((s) => s.id === id)

        if (surveyToEdit) {
            dispatch(setSurvey(surveyToEdit))
            router.push(`/dashboard/survey/${id}/edit`)
        } else {
            toast.error(`Survey with ID ${id} not found.`)
        }
    }

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
            toast.error(`Survey with ID ${survey_id} not found.`)
        }
    }

    // delete
    const handleDelete = (survey_id: number, survey_name: string) => {
        if (survey_id == null) {
            toast.error("id is not present")
        }
        dispatch(setGenModalConfirm({
            ...GenModalConfirm,
            to_delete: true,
            survey_name,
            survey_id
        }))
    }

    // publish
    const handlePublish = (survey_id: number, survey_name: string) => {
        if (survey_id == null) {
            toast.error("id is not present")
        }
        dispatch(setGenModalConfirm({
            ...GenModalConfirm,
            survey_name,
            survey_id,
            to_publish: true
        }))
    }
    // const filterSurvey = surveys.filter(survey => survey.title.startsWith(searchValue))
    const filterSurvey = surveys.filter(survey =>
        survey.title.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    return (
        <div className="w-full">
            <div>
                <p className="text-base sm:text-lg md:text-xl font-bold">Survey List</p>
            </div>
            <hr className="text-gray-300 w-full mt-3" />
            <div className="w-full mt-3 overflow-x-auto">
                <table className="w-full min-w-[600px] border border-gray-300 mt-5 text-xs sm:text-sm md:text-base">
                    <thead className="bg-indigo-600">
                        <tr>
                            <th className="border border-gray-300 py-2 px-2 text-white">Name</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created By</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Created At</th>
                            <th className="border border-gray-300 py-2 px-2 text-white">Published</th>
                            <th className="border border-gray-300 py-2 px-2 text-white" colSpan={4}>Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filterSurvey.length > 0 ? (
                            filterSurvey.map((survey) => (
                                <tr key={survey.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-2 sm:px-3 py-2 text-center text-gray-600 whitespace-nowrap">
                                        {survey.title}
                                    </td>
                                    <td className="border border-gray-300 px-2 sm:px-3 py-2 text-center text-gray-600 whitespace-nowrap">
                                        {survey.createdBy}
                                    </td>
                                    <td className="border border-gray-300 px-2 sm:px-3 py-2 text-center text-gray-600 whitespace-nowrap">
                                        {survey.createdAt?.toString()}
                                    </td>
                                    <td className="border border-gray-300 px-2 sm:px-3 py-2 text-center text-gray-600 whitespace-nowrap">
                                        {`${survey.isPublished}`}
                                    </td>
                                    <td className="border border-gray-300 px-2 sm:px-3 py-2">
                                        <div className="flex flex-wrap gap-2 sm:gap-0 ">
                                            {/* View */}
                                            <button
                                                className="px-2 sm:px-0 text-xs py-1 font-bold text-indigo-500 hover:underline ml-2"
                                                onClick={() => handleView(survey.id)}
                                            >
                                                <Link href="">View</Link>
                                            </button>

                                            {!survey.isPublished && (
                                                <>
                                                    {/* Edit */}
                                                    <button
                                                        className="px-2 sm:px-0 text-xs py-1 font-bold text-indigo-500 hover:underline ml-2"
                                                        onClick={() => handleEdit(survey.id)}
                                                    >
                                                        <Link href="">Edit</Link>
                                                    </button>

                                                    {/* Publish */}
                                                    <button
                                                        className="px-2 sm:px-0 py-1 font-bold text-indigo-500 hover:underline ml-2"
                                                        onClick={() => handlePublish(survey.id, survey.title)}
                                                    >
                                                        <Link href="" className="text-xs">
                                                            Publish
                                                        </Link>
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        className="px-2 sm:px-0 text-xs py-1 font-bold text-indigo-500 flex items-center  hover:underline ml-2"
                                                        onClick={() => handleDelete(survey.id, survey.title)}
                                                    >
                                                        <Link href="">Delete</Link>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-3 text-xl font-bold  text-white bg-red-400">
                                    No surveys found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
