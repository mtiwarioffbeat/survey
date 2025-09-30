"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setMenuOpen, setViewMode } from "@/redux/DashboardSlice/DashboardSlice";
import { FaFileAlt, FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Tooltip from "./Tooltip";
import { usePathname } from "next/navigation";
import { SurveyRoutes } from "@/services/api/SurveyRoutes";
import { useNavigation } from "@/hooks/useNavigation";
import { setLoading } from "@/redux/AuthSlice/AuthSlice";
import Spinner from "./Spinner";
import { resetSurvey } from "@/redux/SurveySlice/SurveySlice";
import { toast } from "react-toastify";
import { resetSession } from "@/redux/DashboardSlice/DashboardSlice";
import Aside from "./Aside"; // import Aside
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [publishLoading, setPublishLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { menuOpen, loading, viewMode } = useAppSelector((store) => store.dashboard);
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const survey = useAppSelector((store) => store.survey);
  const { router } = useNavigation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async () => {
    dispatch(setLoading(true));
    let new_survey = { ...survey, isOpenedInEditMode: false };
    try {
      const res = await SurveyRoutes.UpdateSurvey(new_survey);
      if (res.success) {
        dispatch(resetSurvey());
        router.push("/dashboard");
      }
    } catch {
      toast.error("Failed to save survey");
    } finally {
      dispatch(setLoading(false));
    }
  };
     const handleEdit = () => {
    if (!survey.id) return toast.error("Survey ID is required");
    dispatch(setViewMode(false));
    router.push(`/dashboard/survey/${survey.id}/edit`);
  };

  const handleView = () => {
    if (survey) {
      dispatch(setViewMode(true));
      router.push(`/dashboard/survey/${survey.id}/preview`);
    } else {
      toast.error(`Survey not found.`);
    }
  };


  const handleLogout = async () => {
    try {
      dispatch(resetSession());
      dispatch(resetSurvey());
      localStorage.clear();
      sessionStorage.clear();
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handlePublish = async () => {
    if (!survey.id) return toast.error("Survey ID is required");
    setPublishLoading(true);

    const data = { survey_id: survey.id, to_publish: true, to_delete: false };
    try {
      const res = await SurveyRoutes.PatchSurvey(data);
      if (res.success) {
        toast.success(res.data?.message);
      }
      router.push("/dashboard");
    } catch (err) {
      toast.error("Failed to publish survey");
    } finally {
      setPublishLoading(false);
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white shadow w-full">
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-3 sm:w-[90%]">
        {/* Left logo */}
        <div className="flex items-center gap-2">
          <FaFileAlt className="text-2xl sm:text-3xl text-indigo-700" />
          <span className="text-xl sm:text-2xl font-semibold">Surveys</span>
        </div>

        {/* Right profile + menu toggle */}

        <div className=" flex items-center gap-3 relative" ref={dropdownRef}>
          {pathName === "/dashboard" && (
            <>
          <div className="hidden sm:flex flex-col text-right">
            <p className="text-sm font-semibold">Abhishek</p>
            <p className="text-xs text-gray-500">Joined: 03-09-2025</p>
          </div>

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="focus:outline-none hidden sm:block"
          >
            <FaUserCircle className="text-3xl text-indigo-600 cursor-pointer" />
          </button>

          {profileOpen && (
            <div className="absolute top-12 right-0 w-40 bg-white shadow-md z-50 rounded-md overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
          </>
        )}
          {/* Mobile menu toggle */}
          <button
            onClick={() => dispatch(setMenuOpen(!menuOpen))}
            className="p-2 rounded-md border border-gray-200 sm:hidden"
          >
            <IoMenu className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Mobile Sidebar/Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-3">
          {/* Show Aside sidebar */}
          <Aside />
          {pathName !== "/dashboard" && !viewMode && (
            <>
              <button
                className="flex items-center gap-2 text-indigo-600 hover:bg-indigo-50 w-full px-3 py-2 rounded-md"
                onClick={handleView}
              >
                <MdOutlineRemoveRedEye size={20} /> Preview
              </button>

              <button
                type="button"
                className="w-full text-green-600 font-medium rounded-md text-sm px-3 py-2 border flex justify-center hover:bg-green-600 hover:text-white"
                onClick={handleSave}
              >
                {loading ? <Spinner /> : "Save"}
              </button>

              <button
                type="button"
                className="w-full text-indigo-600 font-medium rounded-md text-sm px-3 py-2 border flex justify-center hover:bg-indigo-600 hover:text-white"
                onClick={handlePublish}
                disabled={publishLoading}
              >
                {publishLoading ? <Spinner /> : "Publish"}
              </button>
            </>
          )}
           {pathName.includes("/dashboard/survey/") && pathName.includes("/preview") && (
            <button
              className="w-full text-indigo-600 font-medium rounded-md text-sm px-3 py-2 border flex justify-center hover:bg-indigo-600 hover:text-white"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      )}

      {/* Desktop Buttons */}
      {pathName !== "/dashboard" && !viewMode && (
        <div className="hidden sm:flex items-center justify-end gap-2 pb-3 px-20">
          <button
            className="flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group"
            onClick={handleView}
          >
            <MdOutlineRemoveRedEye size={24} className="text-indigo-600" />
            <Tooltip text="Preview" />
          </button>

          <button
            type="button"
            className="text-green-600 font-medium rounded-lg text-sm px-3 py-2.5 border flex gap-2 cursor-pointer hover:bg-green-600 hover:text-white"
            onClick={handleSave}
          >
            {loading ? <Spinner /> : "Save"}
          </button>

          <button
            type="button"
            className="text-indigo-600 font-medium rounded-lg text-sm px-3 py-2.5 border flex gap-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
            onClick={handlePublish}
            disabled={publishLoading}
          >
            {publishLoading ? <Spinner /> : "Publish"}
          </button>
        </div>
      )}
      {pathName.includes("/dashboard/survey/") && pathName.includes("/preview") && (
        <div className="hidden sm:flex justify-end pb-3 px-20">
          <button
            className="text-indigo-600 font-medium rounded-lg text-sm px-3 py-2.5 border flex gap-2 cursor-pointer hover:bg-indigo-600 hover:text-white"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </nav>
  );
}