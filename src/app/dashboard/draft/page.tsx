import SearchBox from "@/components/dashboard/SearchBox";
import { IoAddCircle } from "react-icons/io5";
import { MdNotificationAdd } from "react-icons/md";
import Link from "next/link";
export default function DraftPage() {
  const isMenu = true;
  return (
    <div className='w-full flex flex-col px-10  h-screen bg-slate-100' >
      <div className="flex h-screen">
        <div
          className={`transition-all duration-300 flex-1 ${isMenu ? "ml-60" : "ml-0"
            }`}
        >
          <div className="w-full flex flex-col h-screen  ">
            <div className="my-10  h-screen">
              <h1 className="text-3xl flex flex-col items-center ml-20 font-bold">Welcom Admin</h1>
              <div className="flex w-full  flex-row justify-between my-5">
                <SearchBox />
                <div>
                  <div className="flex bg-blue-600 px-1 rounded-4xl text-white">
                    <button className="text-sm">Create new Survey </button>
                    <IoAddCircle className="text-2xl mt-1" />
                  </div>
                   <MdNotificationAdd className="text-2xl " />
                  
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}