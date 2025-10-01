"use client";
import React, { useEffect } from 'react';
import SearchBox from "@/components/dashboard/SearchBox"
import { IoAddCircle } from "react-icons/io5";
import SurveyList from '@/components/dashboard/SurveyList';
import "@/app/globals.css";
import Aside from '@/components/Aside';
import { SurveyRoutes } from '@/services/api/SurveyRoutes';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks';
import { getSession } from '@/lib/getSession';
import { setSession, setShowModal } from '@/redux/DashboardSlice/DashboardSlice';
import { useNavigation } from '@/hooks/useNavigation';
import Modal from '@/components/dashboard/Modal';
import { resetSurvey } from '@/redux/SurveySlice/SurveySlice';
import axios from 'axios';
import { setSurveys } from '@/redux/SurveysSlice/SurveysSlice';
import GenModal from '@/components/dashboard/GenModal';
import { io, Socket } from "socket.io-client";
let socket: Socket;

const Page = () => {
  const { router } = useNavigation()
  const isMenu = true;
  const survey = useAppSelector((store) => store.survey)
  const { session, showModal,GenModalConfirm,loading } = useAppSelector((store) => store.dashboard)
  const surveys = useAppSelector((store)=>store.surveys)
  const dispatch = useAppDispatch()
  
useEffect(() => {
  const getData = async () => {
    try {
      // get session
      const user = await getSession();
      if (user) {
        dispatch(setSession({
          id: user.id,
          name: user.name,
          email: user.email,
        }));
      }

      // get surveys
      // const res = await axios.get('/api/survey');

      // console.log("response for get surveys", res.data);
      // dispatch(setSurveys(res.data.data || []));
      const res = await SurveyRoutes.GetSurvey()
      console.log("resposne in useEffect",res)
      dispatch(setSurveys(res.data?.data || []))
    } catch (err) {
      console.error("Error fetching session/surveys:", err);
      dispatch(setSurveys([])); 
    }
  };

  getData();
}, [dispatch,GenModalConfirm,loading]);



// empty survey curr
useEffect(()=>{
  dispatch(resetSurvey())
},[])

  const handleSurveyCreation = async () => {
    router.push('/dashboard/survey/1')
    const res = await SurveyRoutes.CreateSurvey(survey)
    console.log('response from survey creation', res)
  }

  return <>
    {showModal && <Modal />}
    {(GenModalConfirm?.to_delete || GenModalConfirm?.to_publish) && <GenModal/>}
    <div className='w-full flex flex-col  sm:w-[90%] mx-auto h-full ' >
      <Aside />
      <div className="flex ">

        <div
          className='transition-all duration-300 flex-1'
        >
          <div className="w-full flex flex-col   ">
            <div className="my-10  ">
              <h1 className="text-3xl flex flex-col items-center ml-20 font-bold">Welcom Admin</h1>
              <div className="flex w-full  flex-row justify-between my-5">

                <div className="flex">
                  <button className="flex items-center justify-center bg-indigo-600  hover:bg-indigo-700 transition-all duration-300 ease-in-out px-2 py-1 rounded text-white gap-2 group cursor-pointer" onClick={() => dispatch(setShowModal(true))}>
                    Create new Survey
                    <IoAddCircle className="text-2xl mt-1 group-hover:animate-bounce" />
                  </button>
                </div>
                <SearchBox />
              </div>
              <SurveyList />
            </div>
          </div>
        </div>
      </div>

    </div>
  </>
}
export default Page