"use client";
import { useEffect, useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdAddCircleOutline, MdContentCopy, MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSurvey, setUpdateQuestion } from "@/redux/SurveySlice/SurveySlice";
import type { Survey } from "@/types/survey";
import Tooltip from "@/components/Tooltip";
import { usePathname } from "next/navigation";
import { getSocket } from "@/utils/socket";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import DynamicTooltip from "@/components/Tooltip";
// import { setActiveId } from "@/redux/DashboardSlice/DashboardSlice";
const options: Survey["QuestionType"][] = [
  { title: "Paragraph", description: null },
  { title: "Multiple choice", description: null },
  { title: "Checkboxes", description: null },
  { title: "Drop-down", description: null },
];

type Props = {
  index: number;
  data: Survey["Question"];
  activeId:number ;
  setActiveId:React.Dispatch<React.SetStateAction<number>>
};

export default function Question({ index, data,setActiveId,activeId }: Props) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { questions } = useAppSelector((store) => store.survey)
  const { viewMode } = useAppSelector((store) => store.dashboard)
  const survey = useAppSelector((store) => store.survey)
  // const [activeId,setActiveId] = useState<number|null>(null)
  const socket = getSocket()

  const [selectedOption, setSelectedOption] = useState(null); // State to store the currently selected option

const handleAddQuestion = (idx: number) => {
  const newQ = {
    title: "",
    description: null,
    isDeleted: false,
    type: {
      title: "Paragraph",
      description: null,
    },
    choices: [] as {
      title: string;
      description: string | null;
      isDeleted: false;
    }[],
  };
 
  const updatedQuestions = [
    ...questions.slice(0, idx+1),
    newQ,
    ...questions.slice(idx+1),
  ];
 
  const updatedSurvey = {
    ...survey,
    questions: updatedQuestions,
  };
 
  dispatch(setSurvey(updatedSurvey));
};

  const handleCheckboxChange = (event:any) => {
    const { value, checked } = event.target;
    console.log("checked value", checked, value)

    setSelectedOption(value.toLowerCase()); // Set the selected option to the value of the checked checkbox

  };
  // update a ques (title, desc,type, choices etc)
  const updateQuestion = (updates: Partial<Survey["Question"]>) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      ...updates,
    };

    const updatedSurvey = {
      ...survey,
      questions: updatedQuestions,
    };

    dispatch(setUpdateQuestion({ index, data: updates }));

    socket.emit("survey_update", {
      survey_room: `survey:${survey.id}`,
      updatedSurvey,
    });
  };

  // delete ques
  const deleteQuestion = (idx: number) => {
    const updatedQues = { ...data, isDeleted: true }
    const updatedQuestions = [...survey.questions]
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      ...updatedQues,
    };

    const updatedSurvey = {
      ...survey,
      questions: updatedQuestions,
    };

    socket.emit("survey_update", {
      survey_room: `survey:${survey.id}`,
      updatedSurvey,
    });
    dispatch(setUpdateQuestion({ index, data: updatedQues }))
  }

  // add option
  const addOption = () => {
    const newChoices = [
      ...(data.choices || []),
      { title: `Option ${data.choices?.length! + 1}`, description: null, isDeleted: false },
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
    <div className={`${data.isDeleted ? "hidden" : "block"}`}>
       
      <div 
      key={index}
      className={`
        relative ${activeId===index? "border-indigo-600":"border-transparent"}
        rounded-lg items-center border-l-6 border-indigo-600 bg-white p-6 shadow`}
       onClick={() => {
    if (!viewMode) {
      setActiveId(index);
    }
  }}
        >
        <div className="flex gap-4 justify-between">
          <div className="flex flex-col w-full">
            {/* Question title */}
            <input
              type="text"
              placeholder="Question"
              value={data.title ? data.title : ""}
              disabled={viewMode}
              onChange={(e) => updateQuestion({ title: e.target.value })}
              className="border-b outline-none pb-2 border-gray-300"
            />

            {/* Conditional description */}
            {data.description !== null ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Question Description"
                  value={data.description || ""}
                  onChange={(e) =>
                    updateQuestion({ description: e.target.value })
                  }
                  disabled={viewMode}
                  className="flex-1 border-b outline-none pb-2 border-gray-300"
                />
                {
                  !viewMode &&
                <button
                  onClick={() => updateQuestion({ description: null })}
                  className="text-red-500 text-xs cursor-pointer"
                >
                  Remove
                </button>}
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
              className="flex cursor-pointer items-center justify-between w-48 border px-3 py-2 text-sm bg-white shadow"
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
              <div className="absolute right-0 mt-1 w-48 bg-white border shadow-lg z-10">
                {options.map((opt) => (
                  <div
                    key={opt.title}
                    onClick={() => {
                      updateQuestion({
                        type: opt,
                        choices: [{ title: "Option 1", description: null, isDeleted: false }],
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
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          {data.type.title === "Paragraph" &&

            <div>

              {/* for preview page -- long answer entry */}
              {
                viewMode ?
                  (<textarea placeholder="Long-answer text" rows={1} className="w-full  outline-0 border-b-2 border-indigo-300 "  />) :
                  (<p>Long-answer text</p>)
              }
              {/* for preview page -- long answer entry */}

              {
                questions.length > 1 && !viewMode &&
                <div className="grid grid-flow-col justify-items-end">
                  <button onClick={() => {
                    deleteQuestion(index)
                  }} className=" flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group">
                    {/* <MdDelete size={24} className="text-indigo-600" /> */}
                    {/* <Tooltip text="Delete" /> */}
                  </button>
                </div>
              }

            </div>
          }

          {["Multiple choice", "Checkboxes", "Drop-down"].includes(
            data.type.title
          ) && (
              <div className={`${data.type.title == 'Drop-down' ? ("space-y-0") : ("space-y-4")}`}>
                {(data.choices || []).map((opt, i) => (
                  <div key={i} className={`${opt.isDeleted ? "hidden" : "flex"}  flex-col gap-1`}>
                    <div className="flex gap-2 items-center">
                      {data.type.title === "Multiple choice" && (
                        <input type="radio" disabled={!viewMode} value={opt.title.toLowerCase()} name={opt.title.toLowerCase()} checked={selectedOption === opt.title.toLowerCase()} // Check if this option is the selected one
                          onChange={handleCheckboxChange} />
                      )}
                      {data.type.title === "Checkboxes" && (
                        <input type="checkbox" disabled={!viewMode} />
                      )}

                      {/* when view mdoe is false then we need to show all input for checkbox,multiple-choice,dropdown */}
                      {
                        !viewMode &&
                        <input
                          type="text"
                          value={opt.title}
                          onChange={(e) =>
                            updateOption(i, "title", e.target.value)
                          }
                          disabled={viewMode}
                          placeholder={`Option ${i + 1}`}
                          className={`flex-1 ${viewMode ? "" : "border-b"} outline-none pb-1`}
                        />
                      }
                      {/* when view mdoe is true && type !==drop-down */}
                      {
                        (data.type.title !== 'Drop-down') && viewMode &&
                        <input
                          type="text"
                          value={opt.title}
                          onChange={(e) =>
                            updateOption(i, "title", e.target.value)
                          }
                          disabled={viewMode}
                          placeholder={`Option ${i + 1}`}
                          className={`flex-1 ${viewMode ? "" : "border-b"} outline-none pb-1`}
                        />
                      }
                      {data.choices && data.choices.length > 1 && !viewMode && (
                        <button
                          onClick={() => removeOption(i)}
                          className="text-gray-500"
                        >
                          <RxCross1 size={16} className="cursor-pointer" />
                        </button>
                      )}
                    </div>

                    {/* Option description */}
                    {opt.description !== null ? (
                      <div className="flex items-center gap-3 ml-8">
                        <input
                          type="text"
                          value={opt.description}
                          onChange={(e) =>
                            updateOption(i, "description", e.target.value)
                          }
                          disabled={viewMode}
                          placeholder="Option description"
                          className="flex-1 border-b outline-none text-sm text-gray-500 px-3"
                        />
                        {!viewMode &&

                          <button
                            onClick={() => updateOption(i, "description", null)}
                            className="text-red-400 text-xs cursor-pointer"
                          >
                            Remove
                          </button>
                        }
                      </div>
                    ) : (

                      !viewMode &&
                      (<button
                        onClick={() => updateOption(i, "description", "")}
                        className="text-blue-600 text-xs mt-1 self-start ml-8 cursor-pointer"
                      >
                        + Add description
                      </button>)
                    )}
                  </div>
                ))}
                {data.type.title === "Drop-down" && viewMode && (
                  <div className="relative inline-block">
                    <select
                      id="Drop"
                      className="border border-indigo-300 rounded-lg px-4 py-3 pr-10 appearance-none focus:outline-none focus:ring-0 bg-white text-gray-700 cursor-pointer"
                    >
                      {data.choices?.map((opt, i) => (
                        <option key={opt.title} value={opt.title}>
                          {opt.title}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-gray-500">
                      <MdOutlineArrowDropDown size={22} />
                    </span>
                  </div>
                )}

              

                {!viewMode &&
                  <div className="flex justify-between items-center">
                    <div>
                      <button
                        onClick={addOption}
                        className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs"
                      >
                        Add Option
                      </button>
                    </div>
                    {/* {
                      questions.length > 1 &&
                      <div className="grid grid-flow-col justify-items-end">
                        <DynamicTooltip text="Delete" position="right">

                        <button onClick={() => {
                          deleteQuestion(index)
                        }} className=" flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group">
                        <MdOutlineArrowDropDown size={30} className="text-indigo-400"/>
                          
                        </button>
                          </DynamicTooltip>
                      </div>
                    } */}
                  </div>
                }
              </div>
            )}
        </div>


             {activeId === index && (
            <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 flex flex-col bg-white rounded-lg">
              <DynamicTooltip text="Add question" position="right">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddQuestion(index)
                }}
                className="bg-white  p-2 hover:bg-indigo-50 cursor-pointer rounded-t-lg"
                >
                <MdAddCircleOutline className="text-indigo-600" size={24} />
              </button>
                </DynamicTooltip>
 
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // duplicateQuestion(q);
                }}
                className="bg-white shadow p-2 hover:bg-indigo-50 cursor-pointer"
              >
                <MdContentCopy className="text-indigo-600" size={24} />
              </button>
                <DynamicTooltip text="Delete" position="right">
                  
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(index);
                }}
                className="bg-white  p-2 hover:bg-indigo-50 cursor-pointer group rounded-b-lg"
                >
                <MdDelete className="text-indigo-600" size={24} />
              </button>
                </DynamicTooltip>
            </div>
          )}
 

      </div>

    </div>
  );
}


