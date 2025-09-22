import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setMenuOpen } from "@/redux/DashboardSlice/DashboardSlice";
import { FaFileAlt } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdOutlineRemoveRedEye, MdPublishedWithChanges } from "react-icons/md";
import Tooltip from "./Tooltip";
import { usePathname } from "next/navigation";
export default function DashboardNav() {
    const { menuOpen } = useAppSelector((store) => store.dashboard)
    const dispatch = useAppDispatch()
    const pathName = usePathname()
    // console.log("pathName",pathName)
    // const updateQestion(){

    // }
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
                    pathName !="/dashboard" &&
                      <div className="flex items-center justify-center gap-3">
                    {/* view */}
                    <button className="flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group">

                        <MdOutlineRemoveRedEye size={24} className="text-indigo-600" />
                        <Tooltip text="Preview"/>
                    </button>
                    {/* save */}
                     <button  type="button" className="text-green-600 font-medium rounded-lg text-sm px-3 py-2.5 text-center  border-1  hover:bg-green-600 hover:text-white flex gap-2 cursor-pointer"> Save</button>
                    {/* publish */}
                    <button type="button" className="text-indigo-600 font-medium rounded-lg text-sm px-3 py-2.5 text-center  border-1  hover:bg-indigo-600 hover:text-white flex gap-2 cursor-pointer "> Publish</button>
                  
                </div>
                }
              
            </div>
        </nav>


    )
}