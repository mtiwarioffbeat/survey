"use client";
import { useState } from "react";
import FormHeading from "@/components/dashboard/form/SurveyHeading";
import FormNav from "@/components/dashboard/form/SurveyNav";
import Question from "@/components/dashboard/form/Question";
import Preview from "@/components/dashboard/form/Preview";

export default function PreviewPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const isMenu = true;

  return (
    <div className="w-full flex flex-col px-10 bg-purple-50">
      <div className="flex">
        <div className={`transition-all duration-300 flex-1 ${isMenu ? "ml-60" : "ml-0"}`}>
          <FormNav />
          <FormHeading />

          {/* Question Builder */}
          {/* <Question setQuestions={setQuestions} /> */}

          {/* Preview */}
          <Preview questions={questions} />
        </div>
      </div>
    </div>
  );
}
