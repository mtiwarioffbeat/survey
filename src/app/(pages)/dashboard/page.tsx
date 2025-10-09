"use client";
import React, { useEffect } from "react";
import SearchBox from "@/components/dashboard/SearchBox";
import { IoAddCircle } from "react-icons/io5";
import SurveyList from "@/components/dashboard/SurveyList";
import "@/app/globals.css";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { getSession } from "@/lib/getSession";
import { setSession, setShowModal } from "@/redux/DashboardSlice/DashboardSlice";
import { useNavigation } from "@/hooks/useNavigation";
import Modal from "@/components/dashboard/Modal";
import { resetSurvey } from "@/redux/SurveySlice/SurveySlice";
import { setSurveys } from "@/redux/SurveysSlice/SurveysSlice";
import GenModal from "@/components/dashboard/GenModal";

const Page = () => {
  const { router } = useNavigation();
  const { showModal, GenModalConfirm, loading } = useAppSelector(
    (store) => store.dashboard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        // get session
        const user = await getSession();
        if (!user) {
          router.push("/login");
          return;
        }

        dispatch(
          setSession({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        );

        // get surveys
        const res = await SurveyRoutes.GetSurveys();
        dispatch(setSurveys(res.data));
      } catch (err: any) {
        console.error("Error fetching session/surveys:", err);
        if (err.response?.status === 401) {
          router.push("/login");
          return;
        }
        dispatch(setSurveys([]));
      }
    };

    getData();
  }, [dispatch, GenModalConfirm, loading, router]);

  // reset survey whenever page mounts
  useEffect(() => {
    dispatch(resetSurvey());
  }, [dispatch]);

  return (
    <>
      {showModal && <Modal />}
      {(GenModalConfirm?.to_delete || GenModalConfirm?.to_publish) && <GenModal />}

      <div className="w-[90%] mx-auto flex flex-col h-full px-3 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <main className="flex-1 flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mx-auto lg:text-left mb-6">
              Welcome Admin
            </h1>

            {/* Search + Create Survey */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-6">
              <button
                className="flex items-center justify-center cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-4 py-2 rounded text-white gap-2 w-full sm:w-auto"
                onClick={() => dispatch(setShowModal(true))}
              >
                Create new Survey
                <IoAddCircle className="text-xl sm:text-2xl group-hover:animate-bounce" />
              </button>
               <div className="flex-1 w-full items-end justify-end hidden sm:flex">
                <SearchBox />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <p className="text-base sm:text-lg md:text-xl font-bold">Survey List</p>  
                <div className="block sm:hidden w-auto">
                <SearchBox />
                </div>
            </div>
            <hr className="text-gray-300 w-full" />
            <div className="overflow-x-auto">
              <SurveyList />
            </div>
            
          </main>
        </div>
      </div>
    </>
  );
};

export default Page;