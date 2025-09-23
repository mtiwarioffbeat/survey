'use client'
import FormHeading from "@/components/dashboard/form/SurveyHeading";
import Question from "@/components/dashboard/form/Question";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setAddQuestion } from "@/redux/SurveySlice/SurveySlice";

export default function EditPage() {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((store) => store.survey);
  const {session} = useAppSelector((store)=>store.dashboard)
  console.log("session",session)
  
  const handleAddQuestion = () => {
    const newQuestion = {
      title: "",
      description: null,
      isDeleted:false,
      type: {
        name: "Paragraph", // default type
        description: null,
      },
      choices: [] as {
        title: string;
        description: string | null;
        isDeleted:false
      }[], // empty by default
    };

    dispatch(setAddQuestion(newQuestion));
  };

  return (
    <div className="bg-purple-50 mx-auto mt-10">
      <div className="flex flex-col gap-8 w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        <FormHeading />

        {/* Render all questions */}
        {questions.map((q, idx) => (
          <Question key={idx} index={idx} data={q} />
        ))}

        <button
          onClick={handleAddQuestion}
          className="text-white px-4 py-2 text-sm bg-indigo-600 cursor-pointer rounded"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}