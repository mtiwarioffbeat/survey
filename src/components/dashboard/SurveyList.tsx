import Link from "next/link"
import { RiCloseFill } from "react-icons/ri"
export default function SurveyList() {
    return (
        <div className=" ">
            <div><p className="text-xl font-bold">Survey List</p></div>
            <hr className="text-black w-full " />
            <div className="w-full justify-between flex mt-3">
                
                <div>
                    <p>Name</p>
                </div>
                <div>
                    <ul className="flex px-3 gap-6  ">
                        <li className="text-blue-600"><Link href="">Edit</Link></li>
                        <li className="text-blue-600"><Link href='' >View</Link></li>
                        <li className="text-blue-600"><Link href=''>Publish</Link></li>
                        <button><RiCloseFill /></button>
                    </ul>
                </div>
            </div>
        </div>

    )
}