
"use client";
import { useState } from "react";
import { ImParagraphLeft } from "react-icons/im";
import { IoMdRadioButtonOn, IoMdArrowDropdown } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { X } from "lucide-react"; // close button icon

export default function Question() {
    const options = [
        { type: "Paragraph", icon: <ImParagraphLeft /> },
        { type: "Multiple choice", icon: <IoMdRadioButtonOn /> },
        { type: "Checkboxes", icon: <GrCheckboxSelected /> },
        { type: "Drop-down", icon: <MdOutlineArrowDropDownCircle /> },
    ];

    const [questionType, setQuestionType] = useState(options[0]);
    const [open, setOpen] = useState(false);

    // 👇 new state for question input
    const [questionTitle, setQuestionTitle] = useState("");

    // dynamic options
    const [choices, setChoices] = useState(["Option 1"]);
    const [hasOther, setHasOther] = useState(false);

    const addOption = () => {
        if (questionType.type === "Multiple choice" || questionType.type === "Checkboxes" || questionType.type === "Drop-down") {
            setChoices([...choices, ""]);
        }
    }

    const updateOption = (i: number, v: string) => {
        const newChoices = [...choices];
        newChoices[i] = v;
        setChoices(newChoices);
    };
    const removeOption = (i: number) => setChoices(choices.filter((_, idx) => idx !== i));

    return (
        <div className=" bg-purple-50 flex justify-center py-10">
            <div className="w-full max-w-3xl space-y-6">
                {/* Question Block */}
                <div className="rounded-lg border-l-6 border-indigo-600 bg-white p-6 shadow">
                    <div className="flex gap-4">
                        {/* Question Input */}
                        <input
                            type="text"
                            placeholder="Question"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                            className="flex-1 border-b outline-none pb-2 border-transparent focus:border-gray-300"
                        />

                        {/* Dropdown for type */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="flex cursor-pointer items-center justify-between w-48 border px-3 py-2 text-sm bg-white shadow"
                            >
                                <span className="flex items-center gap-2">
                                    {questionType.icon}
                                    {questionType.type}
                                </span>
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
                                            {opt.icon}
                                            <span>{opt.type}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Answer Preview (Edit Mode) */}
                    <div className="mt-4 text-sm text-gray-600 space-y-2">
                        {/* Paragraph */}
                        {questionType.type === "Paragraph" &&
                            <div>
                                <div >
                                    <p>Long-answer text</p>
                                </div>

                                <hr className="text-gray-200 mt-3" />
                                <hr className="text-gray-200 mt-6" />
                            </div>
                        }
                        {/* Multiple choice */}
                        {questionType.type === "Multiple choice" && (
                            <div className="space-y-2">
                                {choices.map((opt, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input type="radio" disabled />
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => updateOption(i, e.target.value)}
                                            placeholder={`Option ${i + 1}`}
                                            className="flex-1 border-b outline-none pb-1"
                                        />
                                        <button
                                            onClick={() => removeOption(i)}
                                            className="text-gray-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {hasOther && (
                                    <div className="flex gap-2 items-center">
                                        <input type="radio" disabled />
                                        <input
                                            type="text"
                                            placeholder="Other..."
                                            className="flex-1 border-b outline-none pb-1"
                                        />
                                        <button
                                            onClick={() => setHasOther(false)}
                                            className="text-gray-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={addOption}
                                        className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs"
                                    >
                                        Add Option
                                    </button>
                                    or
                                    <button
                                        onClick={() => setHasOther(true)}
                                        disabled={hasOther}
                                        className="text-blue-600 px-2 py-1 text-xs"
                                    >
                                        Add Other
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Checkboxes */}
                        {questionType.type === "Checkboxes" && (
                            <div className="space-y-2">
                                {choices.map((opt, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input type="checkbox" disabled />
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => updateOption(i, e.target.value)}
                                            placeholder={`Option ${i + 1}`}
                                            className="flex-1 border-b outline-none pb-1"
                                        />
                                        <button
                                            onClick={() => removeOption(i)}
                                            className="text-gray-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {hasOther && (
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" disabled />
                                        <input
                                            type="text"
                                            placeholder="Other..."
                                            className="flex-1 border-b outline-none pb-1"
                                        />
                                        <button
                                            onClick={() => setHasOther(false)}
                                            className="text-gray-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={addOption}
                                        className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs"
                                    >
                                        Add Option
                                    </button>
                                    or
                                    <button
                                        onClick={() => setHasOther(true)}
                                        disabled={hasOther}
                                        className="text-blue-600 px-2 py-1 text-xs"
                                    >
                                        Add Other
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Drop-down */}
                        {questionType.type === "Drop-down" && (
                            <div className="space-y-2">
                                {choices.map((opt, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => updateOption(i, e.target.value)}
                                            placeholder={`Option ${i + 1}`}
                                            className="w-full border-b outline-none pb-1"
                                        />
                                        <button
                                            onClick={() => removeOption(i)}
                                            className="text-gray-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                {hasOther && (
                                    <div className="flex gap-2 items-center">
                                        <input
                                            type="text"
                                            placeholder="Other..."
                                            className="w-full border-b outline-none pb-1"
                                        />
                                        <button
                                            onClick={() => setHasOther(false)}
                                            className="text-gray-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={addOption}
                                        className="cursor-pointer hover:bg-white shadow px-2 py-1 text-xs"
                                    >
                                        Add Option
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
{/* Preview Section */ }
{/* <div className="">
                        <h2 className="font-bold">Your Survey Question</h2> */}

{/* Show Question Title */ }

{/* <div className="space-y-6 text-gray-700"> */ }
{/* Paragraph Preview */ }
{/* <div>
                                {questionType.type === "Paragraph" && (
                                <div>
                                {questionTitle && (
                                    <h3 className="text-lg font-semibold  mb-2">
                                        {questionTitle}
                                    </h3>
                                )}
                                 </div>
                                 )}
                                <input
                                    type="text"
                                    placeholder="Your Answer"
                                    className="outline-none border-b w-full"
                                />
                            </div> */}
{/* Multiple Choice Preview */ }
{/* <div>
                                  {questionType.type === "Multiple choice" && (
                                <div>
                                {questionTitle && (
                                    <h3 className="text-lg font-semibold  mb-2">
                                        {questionTitle}
                                    </h3>
                                )}
                                 </div>
                                 )}
                                <ul className="space-y-1">
                                    {questionType.type === "Multiple choice" && (
                                        <div className="space-y-2">
                                            {choices.map((opt, i) => (
                                                <li key={`cb-${i}`} className="flex items-center gap-2">
                                                    <input type="checkbox" />
                                                    <span>{opt || `Option ${i + 1}`}</span>
                                                </li>
                                            ))}
                                            {hasOther && (
                                                <li className="flex items-center gap-2">
                                                    <input type="checkbox" />
                                                    <span>Other...</span>
                                                </li>
                                            )}

                                        </div>
                                    )}
                                </ul>
                            </div> */}
{/* Checkboxes Preview */ }
{/* <div>
                                 {questionType.type === "Checkboxes" && (
                                <div>
                                {questionTitle && (
                                    <h3 className="text-lg font-semibold  mb-2">
                                        {questionTitle}
                                    </h3>
                                )}
                                 </div>
                                 )}
                                <ul className="space-y-1">
                                    {questionType.type === "Checkboxes" && (
                                        <div className="space-y-2">
                                            {choices.map((opt, i) => (
                                                <li key={`cb-${i}`} className="flex items-center gap-2">
                                                    <input type="checkbox" />
                                                    <span>{opt || `Option ${i + 1}`}</span>
                                                </li>
                                            ))}
                                            {hasOther && (
                                                <li className="flex items-center gap-2">
                                                    <input type="checkbox" />
                                                    <span>Other...</span>
                                                </li>
                                            )}

                                        </div>
                                    )}
                                </ul>

                            </div> */}
{/* Drop-down Preview */ }
{/* <div>
                                  {questionType.type === "Drop-down" && (
                                <div>
                                {questionTitle && (
                                    <h3 className="text-lg font-semibold  mb-2">
                                        {questionTitle}
                                    </h3>
                                )}
                                 </div>
                                 )}
                            </div> */}
{/* {questionType.type === "Drop-down" && (
                                <div className="space-y-2">
                                    <select className="border rounded px-2 py-1 w-60">
                                        {choices.map((opt, i) => (
                                            <option key={`dd-${i}`} value={opt}>
                                                {opt || `Option ${i + 1}`}
                                            </option>
                                        ))}
                                        {hasOther && <option value="other">Other...</option>}
                                    </select> */}
{/* Add Option button only for Drop-down */ }
{/* </div>
                            )} */}

