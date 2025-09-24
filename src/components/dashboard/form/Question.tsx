"use client";
import { useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setRemoveQuestion, setSurvey, setUpdateQuestion } from "@/redux/SurveySlice/SurveySlice";
import type { Survey } from "@/types/survey";
import Tooltip from "@/components/Tooltip";

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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const {questions} = useAppSelector((store)=>store.survey)
  // update a question (title, desc, type, choices etc.)
  const updateQuestion = (updates: Partial<Survey["Question"]>) => {
    dispatch(setUpdateQuestion({ index, data: updates }));
  };

  // delete ques
  const deleteQuestion = (idx:number)=>{
    console.log("index of the ques",idx)
    dispatch(setRemoveQuestion(idx))
  }

  // add option
  const addOption = () => {
    const newChoices = [
      ...(data.choices || []),
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
    const newChoices = (data.choices || []).filter((_, idx) => idx !== i);
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

          {/* Question type dropdown */}
          <div className="relative">
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
                        choices: [{ title: "Option 1", description: null,isDeleted:false }],
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
          </div>
        </div>

        {/* Main UI based on question type */}
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          {data.type.title === "Paragraph" &&

            <div>

              <p>Long-answer text</p>
              { 
                questions.length >1 &&
                <div className="grid grid-flow-col justify-items-end">
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
                {(data.choices || []).map((opt, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      {data.type.title === "Multiple choice" && (
                        <input type="radio" disabled />
                      )}
                      {data.type.title === "Checkboxes" && (
                        <input type="checkbox" disabled />
                      )}
                      <input
                        type="text"
                        value={opt.title}
                        onChange={(e) =>
                          updateOption(i, "title", e.target.value)
                        }
                        placeholder={`Option ${i + 1}`}
                        className="flex-1 border-b outline-none pb-1"
                      />
                      {data.choices && data.choices.length > 1 && (
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
                          placeholder="Option description"
                          className="flex-1 border-b outline-none text-sm text-gray-500 px-3"
                        />
                        <button
                          onClick={() => updateOption(i, "description", null)}
                          className="text-red-400 text-xs cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateOption(i, "description", "")}
                        className="text-blue-600 text-xs mt-1 self-start ml-8 cursor-pointer"
                      >
                        + Add description
                      </button>
                    )}
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <div>
                    <button
                      onClick={addOption}
                      className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs"
                    >
                      Add Option
                    </button>
                  </div>
                  {
                        questions.length >1 &&
                    <div className="grid grid-flow-col justify-items-end">
                    <button onClick={() => {
                      deleteQuestion(index)
                    }} className=" flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-[#faf5ff] group">
                      <MdDelete size={24} className="text-indigo-600" />
                      <Tooltip text="Delete" />
                    </button>
                  </div>
                    }
                </div>

              </div>
            )}
        </div>
      </div>
    </div>
  );
}