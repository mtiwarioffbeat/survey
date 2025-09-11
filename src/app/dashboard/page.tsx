"use client";
import React from 'react';
import { MdNotificationAdd } from "react-icons/md";
import SearchBox from "@/components/dashboard/SearchBox"
import { IoAddCircle } from "react-icons/io5";
import SurveyList from '@/components/dashboard/SurveyList';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
const Page = () => {
  const route = useRouter();
  const isMenu = true;
  return (
    <div className='w-full flex flex-col px-10   bg-slate-100' >
      <div className="flex ">

        <div
          className={`transition-all duration-300 flex-1 ${isMenu ? "ml-60" : "ml-0"
            }`}
        >
          <div className="w-full flex flex-col   ">
            <div className="my-10  ">
              <h1 className="text-3xl flex flex-col items-center ml-20 font-bold">Welcom Admin</h1>
              <div className="flex w-full  flex-row justify-between my-5">
                <SearchBox />

                <div className="flex">
                  <div className="flex bg-blue-600 px-1 rounded-4xl text-white">
                    <button onClick={()=>route.push('dashboard/form/1')} className="text-sm cursor-pointer">Create new Survey </button>
                    <IoAddCircle className="text-2xl mt-1" />
                  </div>
                  <div>
                    <MdNotificationAdd className="text-2xl " />
                  </div>

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
export default Page
