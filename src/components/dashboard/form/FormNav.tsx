import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";
export default function FormNav() {
    return (
        <div>
            <nav className=" border-gray-200 dark:bg-gray-900 bg-white shadow w-full">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
                    <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                      <FaFileAlt className="text-3xl text-indigo-700 cursor-pointer"  />
                        <span className="self-center text-2xl hover:underline  whitespace-nowrap dark:text-white">Untitled form</span>
                    </a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default ">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row       md:border-0 md:dark:bg-gray-900">
                            <li>
                                <button type="button" className="text-indigo-600 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2  hover:bg-indigo-600 hover:text-white border-none flex gap-2 cursor-pointer"> <MdPublishedWithChanges className="text-sm mt-1" />Purple</button>
                            </li>
                            <li >
                                  <button type="button" className="text-indigo-600   font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2 hover:bg-indigo-600 hover:text-white border-none flex gap-2 cursor-pointer"> <MdPublishedWithChanges className="text-sm mt-1" />Purple</button>
                            </li>                                                                                                                                           

                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}