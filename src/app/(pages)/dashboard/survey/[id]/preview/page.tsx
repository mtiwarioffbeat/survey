'use client'
import FormHeading from "@/components/dashboard/form/SurveyHeading";
import Question from "@/components/dashboard/form/Question";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setAddQuestion } from "@/redux/SurveySlice/SurveySlice";

export default function peviewPage() {
  const { questions } = useAppSelector((store) => store.survey);


  return (
    <div className="bg-purple-50 mx-auto mt-10">
      <div className="flex flex-col gap-8 w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        <FormHeading />

        {/* Render all questions */}
        {questions.map((q, idx) => (
          <Question key={idx} index={idx} data={q} />
        ))}
      </div>
    </div>
  );
}