"use client";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { resetSession, setMenuOpen } from "@/redux/DashboardSlice/DashboardSlice";
import { resetSurvey } from "@/redux/SurveySlice/SurveySlice";

export default function Aside() {
  const pathname = usePathname();
  const { menuOpen } = useAppSelector((store) => store.dashboard);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {session} = useAppSelector((store)=>store.dashboard)
  const handleLogout = async () => {
    try {
      dispatch(resetSession());
      dispatch(resetSurvey());
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Mobile-only aside menu */}
      {menuOpen && (
        <div className=" sm:hidden w-55 bg-white shadow h-screen flex flex-col fixed top-0 right-0 z-50 transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="py-6 px-5 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
             <FaFileAlt className="text-3xl text-indigo-700 cursor-pointer" />
              <div>
                <p className="text-sm font-semibold">{session?.name}</p>
              </div>
            </div>

            <RiCloseFill
              onClick={() => dispatch(setMenuOpen(false))}
              className="text-2xl cursor-pointer"
            />
          </div>

          {/* Menu */}
          <div className="py-6 px-5 flex flex-col items-center justify-between  space-y-4 h-full">
            <div className="w-full">
              <Link
              href="/dashboard"
              className={`flex items-center gap-3 p-2 rounded text-white ${
                pathname === "/dashboard" ? "bg-indigo-600" : "hover:bg-indigo-700"
              }`}
            >
              <span className="text-sm font-bold">Dashboard</span>
            </Link>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-sm text-gray-700 font-bold px-4 py-3  hover:bg-gray-100 rounded"
            >
              <IoIosLogOut className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}