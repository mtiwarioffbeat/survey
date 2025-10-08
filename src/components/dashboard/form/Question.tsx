"use client";
import { useEffect, useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdDelete, MdOutlineArrowDropDownCircle, MdOutlineArrowDropDown } from "react-icons/md";
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
  const { questions } = useAppSelector((store) => store.survey);
  const { viewMode } = useAppSelector((store) => store.dashboard);
  const survey = useAppSelector((store) => store.survey);
  const socket = getSocket();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheckboxChange = (event: any) => {
    const { value } = event.target;
    setSelectedOption(value.toLowerCase());
  };

  const updateQuestion = (updates: Partial<Survey["Question"]>) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...updates };

    const updatedSurvey = { ...survey, questions: updatedQuestions };

    dispatch(setUpdateQuestion({ index, data: updates }));

    socket.emit("survey_update", {
      survey_room: `survey:${survey.id}`,
      updatedSurvey,
    });
  };

  const deleteQuestion = (idx: number) => {
    const updatedQues = { ...data, isDeleted: true };
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], ...updatedQues };

    const updatedSurvey = { ...survey, questions: updatedQuestions };

    socket.emit("survey_update", {
      survey_room: `survey:${survey.id}`,
      updatedSurvey,
    });
    dispatch(setUpdateQuestion({ index, data: updatedQues }));
  };

  const addOption = () => {
    const newChoices = [
      ...(data.choices || []),
      { title: `Option ${data.choices?.length! + 1}`, description: null, isDeleted: false },
    ];
    updateQuestion({ choices: newChoices });
  };

  const updateOption = (i: number, key: "title" | "description", value: string | null) => {
    const newChoices = [...(data.choices || [])];
    newChoices[i] = { ...newChoices[i], [key]: value };
    updateQuestion({ choices: newChoices });
  };

  const removeOption = (i: number) => {
    const newChoices = [...(data.choices || [])];
    newChoices[i] = { ...newChoices[i], isDeleted: true };
    updateQuestion({ choices: newChoices });
  };

  return (
    <div className={`${data.isDeleted ? "hidden" : "block"} w-full`}>
      <div className="rounded-lg border-l-4 border-indigo-600 bg-white p-4 sm:p-6 shadow-sm sm:shadow-md">
        {/* Top Row - Title and Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col w-full sm:w-[75%]">
            <input
              type="text"
              placeholder="Question"
              value={data.title || ""}
              disabled={viewMode}
              onChange={(e) => updateQuestion({ title: e.target.value })}
              className="border-b border-gray-300 outline-none pb-2 text-sm sm:text-base w-full"
            />

            {data.description !== null ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Question Description"
                  value={data.description || ""}
                  onChange={(e) => updateQuestion({ description: e.target.value })}
                  disabled={viewMode}
                  className="flex-1 border-b border-gray-300 outline-none pb-2 text-sm sm:text-base w-full"
                />
                {!viewMode && (
                  <button
                    onClick={() => updateQuestion({ description: null })}
                    className="text-red-500 text-xs sm:text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ) : (
              !viewMode && (
                <button
                  onClick={() => updateQuestion({ description: "" })}
                  className="text-blue-600 text-xs sm:text-sm mt-2 self-start"
                >
                  + Add description
                </button>
              )
            )}
          </div>

          {!viewMode && (
            <div className="relative w-full sm:w-48">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full border px-3 py-2 text-sm bg-white shadow-sm rounded-md"
              >
                <span className="flex items-center gap-2">
                  {{
                    Paragraph: <ImParagraphLeft />,
                    "Multiple choice": <IoMdRadioButtonOn />,
                    Checkboxes: <GrCheckboxSelected />,
                    "Drop-down": <MdOutlineArrowDropDownCircle />,
                  }[data.type.title]}
                  {data.type.title}
                </span>
                <IoMdArrowDropdown />
              </button>

              {open && (
                <div className="absolute right-0 mt-1 w-full bg-white border shadow-lg rounded-md z-10">
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
                      {{
                        Paragraph: <ImParagraphLeft />,
                        "Multiple choice": <IoMdRadioButtonOn />,
                        Checkboxes: <GrCheckboxSelected />,
                        "Drop-down": <MdOutlineArrowDropDownCircle />,
                      }[opt.title]}{" "}
                      <span>{opt.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Question Content */}
        <div className="mt-4 text-sm text-gray-600 space-y-4">
          {data.type.title === "Paragraph" && (
            <div>
              {viewMode ? (
                <textarea
                  placeholder="Long-answer text"
                  rows={1}
                  className="w-full border-b-2 border-indigo-300 outline-none text-sm sm:text-base"
                />
              ) : (
                <p className="text-gray-500 text-sm">Long-answer text</p>
              )}

              {questions.length > 1 && !viewMode && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => deleteQuestion(index)}
                    className="flex items-center gap-1 cursor-pointer rounded-full p-2 hover:bg-indigo-50"
                  >
                    <MdDelete size={22} className="text-indigo-600" />
                    <Tooltip text="Delete" />
                  </button>
                </div>
              )}
            </div>
          )}

          {["Multiple choice", "Checkboxes", "Drop-down"].includes(data.type.title) && (
            <div className="space-y-3 sm:space-y-4">
              {(data.choices || []).map((opt, i) => (
                <div
                  key={i}
                  className={`${opt.isDeleted ? "hidden" : "flex"} flex-col gap-2 sm:flex-row sm:items-center`}
                >
                  <div className="flex items-center gap-2 w-full">
                    {data.type.title === "Multiple choice" && (
                      <input
                        type="radio"
                        disabled={!viewMode}
                        value={opt.title.toLowerCase()}
                        name={opt.title.toLowerCase()}
                        checked={selectedOption === opt.title.toLowerCase()}
                        onChange={handleCheckboxChange}
                      />
                    )}
                    {data.type.title === "Checkboxes" && <input type="checkbox" disabled={!viewMode} />}

                    <input
                      type="text"
                      value={opt.title}
                      onChange={(e) => updateOption(i, "title", e.target.value)}
                      disabled={viewMode}
                      placeholder={`Option ${i + 1}`}
                      className={`flex-1 text-sm sm:text-base ${
                        viewMode ? "" : "border-b"
                      } outline-none pb-1 w-full`}
                    />
                    {data.choices && data.choices.length > 1 && !viewMode && (
                      <button onClick={() => removeOption(i)} className="text-gray-500">
                        <RxCross1 size={16} />
                      </button>
                    )}
                  </div>

                  {opt.description !== null ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 ml-6 sm:ml-8 w-full">
                      <input
                        type="text"
                        value={opt.description}
                        onChange={(e) => updateOption(i, "description", e.target.value)}
                        disabled={viewMode}
                        placeholder="Option description"
                        className="flex-1 border-b outline-none text-xs sm:text-sm text-gray-500 px-2 sm:px-3"
                      />
                      {!viewMode && (
                        <button
                          onClick={() => updateOption(i, "description", null)}
                          className="text-red-400 text-xs sm:text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ) : (
                    !viewMode && (
                      <button
                        onClick={() => updateOption(i, "description", "")}
                        className="text-blue-600 text-xs sm:text-sm ml-6 sm:ml-8"
                      >
                        + Add description
                      </button>
                    )
                  )}
                </div>
              ))}

              {/* Drop-down view mode */}
              {data.type.title === "Drop-down" && viewMode && (
                <div className="relative inline-block w-full sm:w-auto">
                  <select className="w-full sm:w-auto border border-indigo-300 rounded-lg px-4 py-2 pr-10 text-sm sm:text-base">
                    {data.choices?.map((opt) => (
                      <option key={opt.title} value={opt.title}>
                        {opt.title}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <MdOutlineArrowDropDown size={20} />
                  </span>
                </div>
              )}

              {!viewMode && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-3">
                  <button
                    onClick={addOption}
                    className="hover:bg-indigo-50 border border-gray-200 rounded-md px-3 py-1 text-xs sm:text-sm"
                  >
                    Add Option
                  </button>

                  {questions.length > 1 && (
                    <button
                      onClick={() => deleteQuestion(index)}
                      className="flex items-center justify-center cursor-pointer rounded-full p-2 hover:bg-indigo-50"
                    >
                      <MdDelete size={22} className="text-indigo-600" />
                      <Tooltip text="Delete" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
