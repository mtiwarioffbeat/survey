"use client";
import { useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { setUpdateQuestion, removeQuestion } from "@/redux/SurveySlice/SurveySlice";
import type QuestionState from "@/redux/SurveySlice/SurveySlice";

const options = [
  { type: "Paragraph", icon: <ImParagraphLeft /> },
  { type: "Multiple choice", icon: <IoMdRadioButtonOn /> },
  { type: "Checkboxes", icon: <GrCheckboxSelected /> },
  { type: "Drop-down", icon: <MdOutlineArrowDropDownCircle /> },
];

type Props = {
  index: number;
  data: QuestionState;
};

export default function Question({ index, data }: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  //update a question (title, des, type, choices et..)
  const updateQuestion = (updates: Partial<QuestionState>) => {
    dispatch(setUpdateQuestion({ index, data: updates }));
  };

  // options
  const addOption = () => {
    const newChoices = [...(data.choices || []), `Option ${data.choices?.length! + 1}`];
    updateQuestion({ choices: newChoices });
  };

  const updateOption = (i: number, value: string) => {
    const newChoices = [...(data.choices || [])];
    newChoices[i] = value;
    updateQuestion({ choices: newChoices });
  };

  const removeOption = (i: number) => {
    const newChoices = (data.choices || []).filter((_, idx) => idx !== i);
    updateQuestion({ choices: newChoices });
  };

  return (
    <div>
      <div className="rounded-lg items-center border-l-6 border-indigo-600 bg-white p-6 shadow">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col w-full">
            {/* ques title */}
            <input
              type="text"
              placeholder="Question"
              value={data.title}
              onChange={(e) => updateQuestion({ title: e.target.value })}
              className="border-b outline-none pb-2 border-gray-300"
            />

            {/* conditional description */}
            {data.description !== null ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Question Description"
                  value={data.description || ""}
                  onChange={(e) => updateQuestion({ description: e.target.value })}
                  className="flex-1 border-b outline-none pb-2 border-gray-300"
                />
                <button
                  onClick={() => updateQuestion({ description: null })}
                  className="text-red-500 text-xs cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => updateQuestion({ description: "" })}
                className="text-blue-600 text-xs mt-1 self-start cursor-pointer"
              >
                + Add description
              </button>
            )}
          </div>
          {/* question type dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex cursor-pointer items-center justify-between w-48 border px-3 py-2 text-sm bg-white shadow"
            >
              <span className="flex items-center gap-2">
                {options.find((o) => o.type === data.type)?.icon}
                {data.type}
              </span>
              <IoMdArrowDropdown />
            </button>

            {open && (
              <div className="absolute right-0 mt-1 w-48 bg-white border shadow-lg z-10">
                {options.map((opt) => (
                  <div
                    key={opt.type}
                    onClick={() => {
                      updateQuestion({ type: opt.type, choices: ["Option 1"] });
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {opt.icon} <span>{opt.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

              {/* main ui based on question type chooosed */}
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          {data.type === "Paragraph" && <p>Long-answer text</p>}

          {["Multiple choice", "Checkboxes", "Drop-down"].includes(data.type) && (
            <div className="space-y-2">
              {(data.choices || []).map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  {data.type === "Multiple choice" && <input type="radio" disabled />}
                  {data.type === "Checkboxes" && <input type="checkbox" disabled />}
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 border-b outline-none pb-1"
                  />
                  {data.choices && data.choices.length > 1 && (
                    <button onClick={() => removeOption(i)} className="text-gray-500">
                      <RxCross1 size={16} className="cursor-pointer"/>
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addOption}
                className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs"
              >
                Add Option
              </button>
              or
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
