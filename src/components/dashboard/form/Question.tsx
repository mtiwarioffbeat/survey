"use client";
import { useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { X } from "lucide-react";

const options = [
  { type: "Paragraph", icon: <ImParagraphLeft /> },
  { type: "Multiple choice", icon: <IoMdRadioButtonOn /> },
  { type: "Checkboxes", icon: <GrCheckboxSelected /> },
  { type: "Drop-down", icon: <MdOutlineArrowDropDownCircle /> },
];

interface QuestionProps {
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Question({ setQuestions }: QuestionProps) {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionType, setQuestionType] = useState(options[0]);
  const [choices, setChoices] = useState(["Option 1"]);
  const [hasOther, setHasOther] = useState(false);
  const [open, setOpen] = useState(false);

  const addOption = () => {
    setChoices((prev) => [...prev, ""]);
  };

  const updateOption = (i: number, value: string) => {
    const newChoices = [...choices];
    newChoices[i] = value;
    setChoices(newChoices);
  };

  const removeOption = (i: number) => {
    setChoices((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addQuestion = () => {
    if (!questionTitle.trim()) return;

    const newQuestion = {
      id: Date.now(),
      title: questionTitle,
      type: questionType,
      choices: [...choices],
      hasOther,
    };

    setQuestions((prev) => [...prev, newQuestion]);
    // Reset builder
    setQuestionTitle("");
    setQuestionType(options[0]);
    setChoices(["Option 1"]);
    setHasOther(false);
  };

  return (
    <div>


      <div className="rounded-lg w-195 ml-34 items-center  mt-5 border-l-6 border-indigo-600 bg-white p-6 shadow mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Question"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
            className="flex-1 border-b outline-none pb-2 border-transparent focus:border-gray-300"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex cursor-pointer items-center justify-between w-48 border px-3 py-2 text-sm bg-white shadow"
            >
              <span className="flex items-center gap-2">{questionType.icon} {questionType.type}</span>
              <IoMdArrowDropdown />
            </button>

            {open && (
              <div className="absolute right-0 mt-1 w-48 bg-white border shadow-lg z-10">
                {options.map((opt) => (
                  <div
                    key={opt.type}
                    onClick={() => {
                      setQuestionType(opt);
                      setOpen(false);
                      setChoices(["Option 1"]);
                      setHasOther(false);
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

        {/* Builder UI */}
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          {questionType.type === "Paragraph" && <p>Long-answer text</p>}

          {["Multiple choice", "Checkboxes", "Drop-down"].includes(questionType.type) && (
            <div className="space-y-2">
              {choices.map((opt, i) => (
                <div key={i} className="flex gap-2 items-center">
                  {questionType.type === "Multiple choice" && <input type="radio" disabled />}
                  {questionType.type === "Checkboxes" && <input type="checkbox" disabled />}
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 border-b outline-none pb-1"
                  />
                  {choices.length > 1 && (
                    <button onClick={() => removeOption(i)} className="text-gray-500">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={addOption} className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs">
                Add Option
              </button>
              or
              <button onClick={() => setHasOther(true)} disabled={hasOther} className="text-blue-600 px-2 py-1 text-xs">
                Add Other
              </button>
            </div>
          )}
        </div>


      </div>
      <div className="text-right mt-2">
        <button
          onClick={addQuestion}
          className=" text-white px-4 py-2 items-start flex ml-35 text-sm bg-blue-600 cursor-pointer rounded"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
