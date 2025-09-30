
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSearchValue } from "@/redux/DashboardSlice/DashboardSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSearchValue } from "@/redux/DashboardSlice/DashboardSlice";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchBox() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((store) => store.dashboard.searchValue);

  // const handleChange = (e:any) => {
  // const val =   dispatch(setSearchValue(e.target.value));
  //   console.log("val",val)
  // };

    // const [seach,setSearch] = useState('')
    // const dispatch = useAppDispatch()
    // const {searchValue} = useAppSelector((store)=>store.dashboard)
    // const handleChange = (e:any)=>{
    //     let val = e.target.value
    //     // setSearch
    //     dispatch(setSearchValue(val))
    //     console.log("val",val)
    //     // console.log("val",searchValue)
    // }
  return (
    <div className="relative max-w-sm">
      <input
        type="text"
        placeholder="Search... form"
        value={searchValue}
        onChange={handleChange}
        className="w-full pl-10 pr-3 py-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:shadow"
                value={searchValue}
                onChange={(e)=>handleChange(e)}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <CiSearch className="text-xl" />
      </div>
    </div>
  );
}
