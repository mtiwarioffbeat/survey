'use client'
import SurveyHeading from "@/components/dashboard/form/SurveyHeading";
import Question from "@/components/dashboard/form/Question";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSurvey } from "@/redux/SurveySlice/SurveySlice";
import { getSocket } from "@/utils/socket";
import { useEffect } from "react";
import { setViewMode } from "@/redux/DashboardSlice/DashboardSlice";
export default function EditPage() {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((store) => store.survey);
  const survey = useAppSelector((store) => store.survey)

  const socket = getSocket();
  useEffect(() => {
      dispatch(setViewMode(false));
    }, [dispatch]);
    
  const handleAddQuestion = () => {
    
    const newQuestion = {
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

  return (
    <div className="bg-purple-50 mx-auto mt-10">
      <div className="flex flex-col gap-8 w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        <SurveyHeading />

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