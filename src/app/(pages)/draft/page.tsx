"use client";
import React from 'react';
import { MdNotificationAdd } from "react-icons/md";
import SearchBox from "@/components/dashboard/SearchBox"
import { IoAddCircle } from "react-icons/io5";
import SurveyList from '@/components/dashboard/SurveyList';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import Aside from '@/components/Aside';
const Page = () => {
  const route = useRouter();
  const isMenu = true;
  return (
    <div className='w-full flex flex-col  md:w-[90%] mx-auto h-full ' >
       <Aside/>
      <div className="flex ">

        <div
          className='transition-all duration-300 flex-1'
        >
          <div className="w-full flex flex-col   ">
            <div className="my-10  ">
              <h1 className="text-3xl flex flex-col items-center ml-20 font-bold">Welcom Admin</h1>
              <div className="flex w-full  flex-row justify-between my-5">
                <SearchBox />

                <div className="flex">
                  {/* <div>
                    <MdNotificationAdd className="text-2xl " />
                  </div> */}

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
