
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


export default function Aside({ isMenu, setIsMenu }: { isMenu: boolean; setIsMenu: (val: boolean) => void }) {
  const pathname = usePathname();
  return (
    <>
      {/* Toggle Button (when sidebar is closed) */}
      {!isMenu && (
        <button
          onClick={() => setIsMenu(true)}
          className="absolute top-4 left-4 z-50 p-2 bg-gray-200 rounded-lg shadow"
        >
          <IoMenu className="text-2xl" />
        </button>
      )}

      {/* Sidebar */}
      {isMenu && (
        <div className="w-60 bg-white shadow h-screen flex flex-col fixed top-0 left-0 z-40">
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
                onClick={() => setIsMenu(false)}
                className="text-3xl cursor-pointer"
              />
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="py-6 px-5 flex-1 space-y-4">
            <div className={`flex items-center gap-3 p-2  ${pathname === "/dashboard" ? "bg-gray-300" : "hover:bg-gray-300"} `} >
              <MdDashboard className="text-xl" />
              <Link href="/dashboard" className="text-sm font-bold">
                Dashboard
              </Link>
            </div>
            <div className={`flex items-center gap-3 p-2  ${pathname === "/dashboard/draft" ? "bg-gray-300" : "hover:bg-gray-300 p-2"} `}>
              <MdDrafts className="text-xl" />
              <Link href="/dashboard/draft" className="font-bold text-sm">
                Drafts
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <div className="border-t">
            <button className="w-full font-bold cursor-pointer flex items-center gap-2 text-sm text-gray-700 px-4 py-3">
              <IoIosLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};


