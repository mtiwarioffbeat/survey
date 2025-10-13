"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSurvey } from "@/redux/SurveySlice/SurveySlice";

export default function SurveyHeading() {
  const dispatch = useAppDispatch();
  const survey = useAppSelector((store) => store.survey);
  const {viewMode} = useAppSelector((store)=>store.dashboard)
  const [localTitle, setLocalTitle] = useState(survey.title || "");
  const [localDesc, setLocalDesc] = useState(survey.description || "");

  const descRef = useRef<HTMLDivElement>(null);

  // Update Redux whenever local state changes
  useEffect(() => {
    dispatch(setSurvey({ ...survey, title: localTitle, description: localDesc }));
  }, [localTitle, localDesc, dispatch]);

  // Initialize description from Redux (only when loading survey)
  useEffect(() => {
    if (descRef.current && survey.description  !== descRef.current.innerText) {
      descRef.current.innerText = survey.description;
      setLocalDesc(survey.description);
    }
  }, [survey.description]);


  return (
    <div>
      <div className="bg-white px-4 items-center border-t-8 border-indigo-500 rounded-lg">
        {/* Survey title */}
        <input
          className="text-3xl font-medium outline-none my-5 w-full"
          placeholder="Survey Heading"
          value={localTitle}
          disabled={viewMode}
          onChange={(e) => setLocalTitle(e.target.value)}
        />

        <hr className="text-gray-300" />

        {/* Survey description */}
        <div className="relative">
          <div
            ref={descRef}
            className="outline-none text-gray-700 min-h-[40px] py-2 w-full "
            role="textbox"
            aria-label="Survey description"
            contentEditable={!viewMode}         
            suppressContentEditableWarning
            onInput={(e)=> setLocalDesc((e.target as HTMLDivElement).innerText)}
          />
          {(!localDesc || localDesc.trim() === "") && (
            <span className="absolute left-2 top-2 text-gray-400 pointer-events-none">
              Form description
            </span>
          )}
        </div>

        <hr className="text-gray-300 p-2" />
      </div>
    </div>
  );
}
