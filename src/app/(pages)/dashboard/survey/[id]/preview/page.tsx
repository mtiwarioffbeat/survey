'use client'
import FormHeading from "@/components/dashboard/form/SurveyHeading";
import Question from "@/components/dashboard/form/Question";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setAddQuestion, setSurvey } from "@/redux/SurveySlice/SurveySlice";
import { useEffect } from "react";
import { getSocket } from "@/utils/socket";

export default function peviewPage() {
  const { questions } = useAppSelector((store) => store.survey);
  const survey = useAppSelector((store) => store.survey)
  const dispatch = useAppDispatch();
  const socket = getSocket();

  // useEffect(() => {

  //   // join a unique room for this survey
  //   socket.emit("join_survey_room", `survey:${survey?.id}`);

  //   // listen for updates
  //   socket.on("survey_update", (updatedSurvey) => {
  //     console.log("Got survey update:", updatedSurvey);
  //     dispatch(setSurvey(updatedSurvey))
  //   });

  //   return () => {
  //     socket.off("survey_update");
  //   };
  // }, [socket]);

  // const socket = getSocket();
useEffect(() => {

  socket.emit("join_survey_room", `survey:${survey?.id}`);

  socket.on("survey_update", (updatedSurvey) => {
    console.log("Got survey update:", updatedSurvey);
    dispatch(setSurvey(updatedSurvey));
  });

  return () => {
    socket.off("survey_update");
  };
}, [survey.id]);

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