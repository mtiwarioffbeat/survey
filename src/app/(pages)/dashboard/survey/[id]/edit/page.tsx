'use client'
import FormHeading from "@/components/dashboard/form/SurveyHeading";
import Question from "@/components/dashboard/form/Question";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setAddQuestion, setSurvey } from "@/redux/SurveySlice/SurveySlice";
import { getSocket } from "@/utils/socket";
import { useEffect } from "react";
export default function EditPage() {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((store) => store.survey);
  const {session} = useAppSelector((store)=>store.dashboard)
  const survey = useAppSelector((store)=>store.survey)
  

  const socket = getSocket();
  const handleAddQuestion = () => {

  const newQuestion = {
    title: "",
    description: null,
    isDeleted: false,
    sortOrder: questions.length + 1,
    type: {
      title: "Paragraph", // default type
      description: null,
    },
    choices: [] as {
      title: string;
      description: string | null;
      isDeleted: false;
      sortOrder: 1;
    }[],
  };

   const updatedSurvey = {
    ...survey,
    questions: [...survey.questions, newQuestion],
  };

  dispatch(setSurvey(updatedSurvey));

  socket.emit("survey_update", {
    survey_room: `survey:${survey.id}`,
    updatedSurvey,
  });
};


//   const handleAddQuestion = () => {
//   const socket = getSocket();

//   const newQuestion = {
//     title: "",
//     description: null,
//     isDeleted: false,
//     sortOrder: questions.length + 1,
//     type: {
//       title: "Paragraph",
//       description: null,
//     },
//     choices: [],
//   };

//   // update Redux first
//   dispatch(setAddQuestion(newQuestion));

//   // then emit update
//   socket.emit("survey_update", {
//     survey_room: `survey:${survey.id}`,
//     updatedSurvey: {
//       ...survey,
//       questions: [...survey.questions, newQuestion],
//     },
//   });
  
// };

  return (
    <div className="bg-purple-50 mx-auto mt-10">
      <div className="flex flex-col gap-8 w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        <FormHeading />

        {/* Render all questions */}
        {questions.filter(q => !q.isDeleted).map((q, idx) => (
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