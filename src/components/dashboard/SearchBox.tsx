// "use client";

// import React, { useRef } from "react";
// import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
// import { setSearchValue } from "@/redux/DashboardSlice/DashboardSlice";
// import { CiSearch } from "react-icons/ci";

// export default function SearchBox() {
//   const dispatch = useAppDispatch();
//   const { searchValue } = useAppSelector((store) => store.dashboard);
//   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const val = e.target.value;

//     // Clear previous timer if it exists
//     if (debounceTimer.current) {
//       clearTimeout(debounceTimer.current);
//     }
//     // Set a new debounce timer
//     debounceTimer.current = setTimeout(() => {
//       dispatch(setSearchValue(val)); // Debounced dispatch
//       console.log("Dispatched value:", val);
//     }, 300); // 300ms debounce delay
//   };

//   return (
//     <div className="relative max-w-sm">
//       <input
//         type="text"
//         defaultValue={searchValue}
//         onChange={handleChange}
//         placeholder="Search... form"
//         className="w-full pl-10 pr-3 py-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:shadow"
//       />
//       <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//         <CiSearch className="text-xl" />
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSearchValue } from "@/redux/DashboardSlice/DashboardSlice";
import { CiSearch } from "react-icons/ci";

// Global timer and debounce function
let globalTimer: ReturnType<typeof setTimeout> | null = null;

function debounce(func: (...args: any[]) => void, delay: number) {
  return (...args: any[]) => {
    if (globalTimer) clearTimeout(globalTimer);
    globalTimer = setTimeout(() => func(...args), delay);
  };
}

export default function SearchBox() {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((store) => store.dashboard);

  // Debounced dispatch (defined once)
  const debouncedDispatch = debounce((val: string) => {
    dispatch(setSearchValue(val));
    console.log("Dispatched value:", val);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedDispatch(e.target.value);
  };

  return (
    <div className="relative max-w-sm">
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
