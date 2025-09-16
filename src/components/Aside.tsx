
"use client"
import React from "react";
import { MdDrafts } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setMenuOpen } from "@/redux/DashboardSlice/DashboardSlice";

export default function Aside() {
  const pathname = usePathname();
  const {menuOpen} = useAppSelector((store)=>store.dashboard)
  const dispatch = useAppDispatch()
  return (
    <>
    
      {/* Toggle Button (when sidebar is closed) */}
     
      {/* Sidebar */}
      {menuOpen && (
        <div className="w-60 bg-white shadow h-screen  flex flex-col fixed top-0 left-0 z-100 transition-all duration-300 ease-in-out">
          <div className="py-6 px-5 border-b flex justify-between items-center">
            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <FaRegUserCircle className="text-3xl text-gray-600" />
              <div>
                <p className="text-sm font-semibold">Abhishek</p>
                <p className="text-xs text-gray-500">Joined: 03-09-2025</p>
              </div>
            </div>
            {/* Toggle Close */}
            <div>
              <RiCloseFill
                onClick={() => dispatch(setMenuOpen(false))}
                className="text-3xl cursor-pointer"
              />
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="py-6 px-5  flex-1 space-y-4">
            <div className={`flex items-center gap-3 p-2 cursor-pointer  ${pathname === "/dashboard" ? "bg-gray-300" : "hover:bg-gray-300"} `} >
              <MdDashboard className="text-xl" />
              <Link href="/dashboard" className="text-sm font-bold">
                Dashboard
              </Link>
            </div>
            <div className={`flex items-center gap-3 p-2 cursor-pointer  ${pathname === "/draft" ? "bg-gray-300" : "hover:bg-gray-300 p-2"} `}>
              <MdDrafts className="text-xl" />
              <Link href="/draft" className="font-bold text-sm">
                Drafts
              </Link>
            </div>

            {/* Logout Button */}
            <div className="border-t mt-90 ">
              <button className="w-full font-bold cursor-pointer flex items-center gap-2 text-sm text-gray-700 px-4 py-3">
                <IoIosLogOut className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


