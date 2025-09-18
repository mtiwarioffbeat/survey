"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/app/globals.css";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSurvey } from "@/redux/SurveySlice/SurveySlice";

export default function SurveyHeading() {
  const dispatch = useAppDispatch();
  const survey  = useAppSelector((store) => store.survey);

  const [localName, setLocalName] = useState(survey.name || "");
  const [localDesc, setLocalDesc] = useState(survey.description || "");

  const descRef = useRef<HTMLDivElement>(null);

//   redx 
  useEffect(() => {
  dispatch(setSurvey({ name: localName, description: localDesc }));

  }, [localName, localDesc, dispatch]);

  // keep local state in sync with Redux if changed elsewhere
//   useEffect(() => {
//     setLocalName(survey.name || "");
//     setLocalDesc(survey.description || "");
//   }, [survey.name, survey.description]);

  return (
    <div>
      <div className="bg-white px-4 items-center border-t-8 border-indigo-500 rounded-lg">
        {/* surv title */}
        <input
          className="text-3xl font-medium outline-none my-5 w-full"
          placeholder="Survey Heading"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />

        <hr className="text-gray-300" />

        {/* div*/}
        <div
          ref={descRef}
          className="outline-none text-gray-700 min-h-[40px] py-2"
          role="textbox"
          aria-label="Survey description"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) =>
            setLocalDesc((e.target as HTMLDivElement).innerText)
          }
        >
          {localDesc || ""}
        </div>
        {localDesc === "" && (
          <div className="absolute text-gray-400 pointer-events-none -mt-8 ml-1">
            Form description
          </div>
        )}

        <hr className="text-gray-300 p-2" />
      </div>
    </div>
  );
}
