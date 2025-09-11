import SearchBox from "@/components/dashboard/SearchBox";

import { MdNotificationAdd } from "react-icons/md";
import Link from "next/link";
import SurveyList from "@/components/dashboard/SurveyList";
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
                    <MdNotificationAdd className="text-2xl " />
                  </div>
              </div>
              <SurveyList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}