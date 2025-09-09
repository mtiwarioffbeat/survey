"use client";
import React from 'react';
import { MdNotificationAdd } from "react-icons/md";
import SearchBox from "@/components/dashboard/SearchBox"
import SurveyList from '@/components/dashboard/SurveyList';
const Page = () => {
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
                <MdNotificationAdd className="text-3xl " />
              </div>
              <SurveyList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Page
