"use client";
import React, { useEffect } from 'react';
import { MdNotificationAdd } from "react-icons/md";
import SearchBox from "@/components/dashboard/SearchBox"
import { IoAddCircle } from "react-icons/io5";
import SurveyList from '@/components/dashboard/SurveyList';
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import Aside from '@/components/Aside';
import { SurveyRoutes } from '@/services/api/SurveyRoutes';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks';
import { getSession } from '@/lib/getSession';
import { setSession } from '@/redux/DashboardSlice/DashboardSlice';
import { useNavigation } from '@/hooks/useNavigation';
const Page = () => {
 const {router} = useNavigation()
  const isMenu = true;
  const survey = useAppSelector((store)=>store.survey)
  const {session} = useAppSelector((store)=>store.dashboard)
  const dispatch = useAppDispatch()

   useEffect(()=>{
     async function get(){
         const user = await getSession()
        console.log("user",user)
         const temp = {
          id:user?.id,
          name:user?.name,
          email:user?.email
         }
        //  console.log("current user",user)
        //  router.push('/signup')
        dispatch(setSession(temp))
       }
       get()
   },[])


   
  //  console.log("Dashbord pag  ",session)

    const handleSurveyCreation = async () =>{
    // console.log("handlesurveysubmit",survey)
    // console.log("session bro",session)
    router.push('/dashboard/survey/1')
    const res = await SurveyRoutes.CreateSurvey(survey)
    console.log('response from survey creation',res)
  }
  
  return (
    <div className='w-full flex flex-col  sm:w-[90%] mx-auto h-full ' >
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
                  <button className="flex bg-blue-600  hover:bg-blue-700 transition-all duration-300 ease-in-out px-2 py-1 rounded text-white gap-2 group cursor-pointer" onClick={handleSurveyCreation}>
                   Create new Survey 
                    <IoAddCircle className="text-2xl mt-1 group-hover:animate-bounce" />
                  </button>

                  {/* <div className="flex bg-blue-600  hover:bg-blue-700 transition-all duration-300 ease-in-out px-2 py-1 rounded-4xl text-white gap-2 group">
                    <button onClick={()=>route.push('dashboard/survey/1')} className="text-sm cursor-pointer">Create new Survey </button>
                    <IoAddCircle className="text-2xl mt-1 group-hover:animate-bounce" />
                  </div> */}


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
