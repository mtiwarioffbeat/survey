
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSearchValue } from "@/redux/DashboardSlice/DashboardSlice";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { setInterval } from "timers/promises";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { setSurveys } from "@/redux/SurveysSlice/SurveysSlice";
export default function SearchBox() {
  const dispatch = useAppDispatch()
  const { searchValue } = useAppSelector((store) => store.dashboard)
  async function getSearchData(val: string) {
    try {
      const res = await SurveyRoutes.GetSurveys(val);
      console.log("ressssss",res)
      if (res.success) {
        console.log("Search Results:", res.data);
        
        dispatch(setSurveys(res.data ))
      } else {
        console.log("Search Error:", res.message);
      }
    } catch (err) {
      console.log("Error message", err);
    }
  }
  let timer: ReturnType<typeof setTimeout>;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  dispatch(setSearchValue(val));
  console.log("val", val);

  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    getSearchData(val);  // Use the new value directly
  }, 100);
};

  return (
    <div className="relative w-full sm:max-w-[45%] lg:max-w-[25%]">
      <input
        type="text"
        placeholder="Search... form"
        value={searchValue}
        onChange={handleChange}
        className="w-full pl-10 pr-3 py-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:shadow"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <CiSearch className="text-xl" />
      </div>
    </div>
  );
}
