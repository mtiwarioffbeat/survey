"use client";
import { useEffect, useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setRemoveQuestion, setSurvey, setUpdateQuestion } from "@/redux/SurveySlice/SurveySlice";
import type { Survey } from "@/types/survey";
import Tooltip from "@/components/Tooltip";
import { usePathname } from "next/navigation";
import { setViewMode } from "@/redux/DashboardSlice/DashboardSlice";
import { getSocket } from "@/utils/socket";

const options: Survey["QuestionType"][] = [
  { title: "Paragraph", description: null },
  { title: "Multiple choice", description: null },
  { title: "Checkboxes", description: null },
  { title: "Drop-down", description: null },
];

type Props = {
  index: number;
  data: Survey["Question"];
};

export default function Question({ index, data }: Props) {
   const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const {questions} = useAppSelector((store)=>store.survey)
  const {viewMode} = useAppSelector((store)=>store.dashboard)
  const survey = useAppSelector((store)=>store.survey)
  const socket = getSocket()
  // check pathname
  useEffect(()=>{
    if(!pathname.includes('/preview')){
      dispatch(setViewMode(false))
    }

  },[pathname])


  // update a ques (title, desc,type, choices etc)
  const updateQuestion = (updates: Partial<Survey["Question"]>) => {
    console.log("updates data ffrom question type",updates)
    // socket update call
    // const updatedSurvey = {
    //   ...survey,
    //   questions:[...survey.questions, {...questions[index],...updates}]
      
    // }
    dispatch(setUpdateQuestion({ index, data: updates }));
    // console.log("updated survey",updatedSurvey)
    // socket.emit("survey_update",{
    //   survey_room:`survey:${survey.id}`,
    //   updatedSurvey
    // })
  };

  // delete ques
  const deleteQuestion = (idx:number)=>{
    console.log("index of the ques",idx)
    // dispatch(setRemoveQuestion(idx))
    const updatedQues = {...data,isDeleted:true}
    dispatch(setUpdateQuestion({index,data:updatedQues}))
  }

  // add option
  const addOption = () => {
    const newChoices = [
      ...(data.choices || []),
      // { title: `Option ${data.choices?.length! + 1}`, description: null,isDeleted:false, sortOrder: `${data.choices?.length! + 1}` },
      { title: `Option ${data.choices?.length! + 1}`, description: null,isDeleted:false },
    ];
    updateQuestion({ choices: newChoices });
  };

  // update option (title or description)
  const updateOption = (
    i: number,
    key: "title" | "description",
    value: string | null
  ) => {
    const newChoices = [...(data.choices || [])];
    newChoices[i] = { ...newChoices[i], [key]: value };
    updateQuestion({ choices: newChoices });
  };

  // remove option
  const removeOption = (i: number) => {
  const newChoices = [...(data.choices || [])];
  newChoices[i] = { ...newChoices[i], isDeleted: true };
  updateQuestion({ choices: newChoices });
};

  return (
    <div>
      <div className="rounded-lg items-center border-l-6 border-indigo-600 bg-white p-6 shadow">
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col w-full">
            {/* Question title */}
            <input
              type="text"
              placeholder="Question"
              value={data.title? data.title:""}
              disabled={viewMode}
              onChange={(e) => updateQuestion({ title: e.target.value })}
              className="border-b outline-none pb-2 border-gray-300 w-full"
            />

            {/* Conditional description */}
            {data.description !== null ? (
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  placeholder="Question Description"
                  value={data.description || ""}
                  onChange={(e) =>
                    updateQuestion({ description: e.target.value })
                  }
                  className="flex-1 border-b outline-none pb-2 border-gray-300"
                />
                <button
                  onClick={() => updateQuestion({ description: null })}
                  className="text-red-500 text-xs cursor-pointer flex-shrink-0 "
                >
                  Remove
                </button>
              </div>
            ) : (!viewMode &&
              <button
              onClick={() => updateQuestion({ description: "" })}
              className="text-blue-600 text-xs mt-1 self-start cursor-pointer"
              >
              + Add description
              </button>
            
            )}
          </div>

          {/* Question type dropdown */}
          {!viewMode && <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex cursor-pointer items-center justify-between w-full sm:w-48 border px-3 py-2 text-sm bg-white shadow"
            >
              <span className="flex items-center gap-2">
                {
                  {
                    Paragraph: <ImParagraphLeft />,
                    "Multiple choice": <IoMdRadioButtonOn />,
                    Checkboxes: <GrCheckboxSelected />,
                    "Drop-down": <MdOutlineArrowDropDownCircle />,
                  }[data.type.title]
                }
                {data.type.title}
              </span>
              <IoMdArrowDropdown />
            </button>

            {open && (
              <div className="absolute left-0 sm:right-0 mt-1 w-full sm:w-48 bg-white border shadow-lg z-10">
                {options.map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => {
                      updateQuestion({
                        type: opt,
                        // choices: [{ title: "Option 1", description: null,isDeleted:false, sortOrder:1}],
                        choices: [{ title: "Option 1", description: null,isDeleted:false}],
                      });
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {
                      {
                        Paragraph: <ImParagraphLeft />,
                        "Multiple choice": <IoMdRadioButtonOn />,
                        Checkboxes: <GrCheckboxSelected />,
                        "Drop-down": <MdOutlineArrowDropDownCircle />,
                      }[opt.title]
                    }{" "}
                    <span>{opt.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>}
        </div>

        {/* Main UI based on question type */}
        <div className="mt-4 text-sm text-gray-600 space-y-2 w-full">
          {data.type.title === "Paragraph" &&

            <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

              <p className="flex-shrink-0">Long-answer text</p>
              { 
                questions.length >1 && !viewMode &&
                <div className="flex justify-end">
                <button onClick={() => {
                  deleteQuestion(index)
                }} className=" flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group">
                  <MdDelete size={24} className="text-indigo-600" />
                  <Tooltip text="Delete" />
                </button>
              </div>
                }

            </div>
          }

          {["Multiple choice", "Checkboxes", "Drop-down"].includes(
            data.type.title
          ) && (
              <div className="space-y-4">
                {(data.choices || []).filter( opt => !opt.isDeleted).map((opt, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      {data.type.title === "Multiple choice" && (
                        <input type="radio" disabled className="flex-shrink-0" />
                      )}
                      {data.type.title === "Checkboxes" && (
                        <input type="checkbox" disabled className="flex-shrink-0" />
                      )}
                      <input
                        type="text"
                        value={opt.title}
                        onChange={(e) =>
                          updateOption(i, "title", e.target.value)
                        }
                        placeholder={`Option ${i + 1}`}
                        className={`flex-1 ${viewMode ? "":"border-b"} outline-none pb-1 min-w-0`}
                      />
                      {data.choices && data.choices.length > 1 && !viewMode &&(
                        <button
                          onClick={() => removeOption(i)}
                          className="text-gray-500 flex-shrink-0"
                        >
                          <RxCross1 size={16} className="cursor-pointer" />
                        </button>
                      )}
                    </div>

                    {/* Option description */}
                    {opt.description !== null ? (
                      <div className="flex items-center gap-3 ml-4 sm:ml-8 w-full">
                        <input
                          type="text"
                          value={opt.description}
                          onChange={(e) =>
                            updateOption(i, "description", e.target.value)
                          }
                          placeholder="Option description"
                          className="flex-1 border-b outline-none text-sm text-gray-500 px-3 min-w-0"
                        />
                        <button
                          onClick={() => updateOption(i, "description", null)}
                          className="text-red-400 text-xs cursor-pointer flex-shrink-0 mr-6"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                     
                      !viewMode &&
                     ( <button
                        onClick={() => updateOption(i, "description", "")}
                        className="text-blue-600 text-xs mt-1 self-start ml-4 sm:ml-8 cursor-pointer"
                      >
                        + Add description
                      </button> )
                    )}
                  </div>
                ))}
                { !viewMode &&
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="w-full sm:w-auto">
                    <button
                      onClick={addOption}
                      className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs w-full sm:w-auto"
                    >
                      Add Option
                    </button>
                  </div>
                  {
                        questions.length >1 &&
                    <div className="flex justify-end">
                    <button onClick={() => {
                      deleteQuestion(index)
                    }} className=" flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group">
                      <MdDelete size={24} className="text-indigo-600" />
                      <Tooltip text="Delete" />
                    </button>
                  </div>
                    }
                </div>
}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}