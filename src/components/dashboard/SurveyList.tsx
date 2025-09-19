import { RiCloseFill } from "react-icons/ri"
import Link from "next/link"
export default function SurveyList() {
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
                        <tr >
                            <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">Survey Form</td>
                            <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">Abhishek Kumar</td>
                            <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">02-10-2025</td>
                            <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-600">False</td>
                            <td className="px-2 sm:px-3 py-2 font-bold text-indigo-500"><Link href="">Edit</Link></td>
                            <td className=" px-2 sm:px-3 py-2 font-bold text-indigo-500"><Link href="">View</Link></td>
                            <td className=" px-2 sm:px-3 py-2 font-bold text-indigo-500"><Link href="">Publish</Link></td>
                            <td className="px-2 sm:px-3 py-2 font-bold text-indigo-500 flex items-center gap-1">
                                <Link href="">Delete</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}