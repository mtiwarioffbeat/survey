import { CiSearch } from "react-icons/ci";
export default function SearchBox() {
    return (
        <div className="relative  max-w-sm ">
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-1 text-sm rounded-full border border-gray-300 focus:outline-none  focus:shadow"
            />
            <div className="absolute  ml-3 top-4.5 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <CiSearch className="text-xl" />
                </svg>
            </div>
        </div>
    )
}