
"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSearchValue } from "@/redux/DashboardSlice/DashboardSlice";
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
 

    
    const dispatch = useAppDispatch()
    const {searchValue} = useAppSelector((store)=>store.dashboard)
    const handleChange = (e:any)=>{
        const val = e.target.value
        // setSearch
        dispatch(setSearchValue(val))
        console.log("val",val)
        // console.log("val",searchValue)
    }
  return (
    <div className="relative w-full sm:max-w-[45%] lg:max-w-[25%]">
      <input
        type="text"
        defaultValue={searchValue}
        onChange={handleChange}
        placeholder="Search... form"
        className="w-full pl-10 pr-3 py-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:shadow"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <CiSearch className="text-xl" />
      </div>
    </div>
  );
}
