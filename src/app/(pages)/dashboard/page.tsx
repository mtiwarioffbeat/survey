"use client";
import React, { useEffect } from "react";
import SearchBox from "@/components/dashboard/SearchBox";
import { IoAddCircle } from "react-icons/io5";
import SurveyList from "@/components/dashboard/SurveyList";
import "@/app/globals.css";
import Aside from "@/components/Aside";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { getSession } from "@/lib/getSession";
import { setSession, setShowModal } from "@/redux/DashboardSlice/DashboardSlice";
import { useNavigation } from "@/hooks/useNavigation";
import Modal from "@/components/dashboard/Modal";
import { resetSurvey } from "@/redux/SurveySlice/SurveySlice";
import axios from "axios";
import { setSurveys } from "@/redux/SurveysSlice/SurveysSlice";
import GenModal from "@/components/dashboard/GenModal";

const Page = () => {
  const { router } = useNavigation();
  const survey = useAppSelector((store) => store.survey);
  const { showModal, GenModalConfirm } = useAppSelector(
    (store) => store.dashboard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
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

        const res = await axios.get("/api/survey", { withCredentials: true });
        dispatch(setSurveys(res.data.data || []));
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
  }, [dispatch, GenModalConfirm, router]);

  useEffect(() => {
    dispatch(resetSurvey());
  }, [dispatch]);

  const handleSurveyCreation = async () => {
    const res = await SurveyRoutes.CreateSurvey(survey);
    console.log("response from survey creation", res);
    router.push("/dashboard/survey/1");
  };

  return (
    <>
      {showModal && <Modal />}
      {(GenModalConfirm?.to_delete || GenModalConfirm?.to_publish) && <GenModal />}

      {/* Container centered with 80% width */}
      <div className="w-[90%] mx-auto flex flex-col h-full px-3 py-6">
        {/* Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
         

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold text-center lg:text-left mb-6">
              Welcome Admin
            </h1>

            {/* Search + Create Survey */}
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-6">
              <div className="flex-1 w-full">
                <SearchBox />
              </div>

              <button
                className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-4 py-2 rounded text-white gap-2 w-full sm:w-auto"
                onClick={() => dispatch(setShowModal(true))}
              >
                Create new Survey
                <IoAddCircle className="text-xl sm:text-2xl group-hover:animate-bounce" />
              </button>
            </div>

            {/* Survey List */}
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
