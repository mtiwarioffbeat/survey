"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks';
import { setViewMode } from '@/redux/DashboardSlice/DashboardSlice';
import { setSurvey, resetSurvey } from '@/redux/SurveySlice/SurveySlice';
import Question from '@/components/dashboard/form/Question';
import SurveyHeading from '@/components/dashboard/form/SurveyHeading';
import { toast } from 'react-toastify';
import axios from 'axios';

const SurveyResponderPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const questions = useAppSelector((store) => store.survey.questions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        dispatch(setViewMode(true));

        if (!id) {
          toast.error('Invalid survey URL');
          return;
        }

        const response = await axios.get(`/api/survey/${id}`);
        const survey = response.data;

        if (!survey) {
          toast.error('Survey not found');
        } else {
          dispatch(setSurvey(survey));
        }
      } catch (error) {
        console.error('Error loading survey:', error);
        toast.error('Failed to load survey');
      } finally {
        setLoading(false);
      }
    };

    loadSurvey();
  }, [id]);

  
  const handleClearSurvey = () => {
    dispatch(resetSurvey());
  };

  if (loading) {
    return <div className="text-center mt-10">Loading survey...</div>;
  }

  return (
    <div className="bg-purple-50 mx-auto mt-10">
      <div className="flex flex-col gap-8 w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
        <SurveyHeading />

        {questions.map((q, idx) => (
          <Question key={idx} index={idx} data={q} />
        ))}

        <div className='flex justify-between'>
          <button
            className="mb-8 text-white px-6 py-2 text-sm bg-indigo-600 cursor-pointer rounded"
          >
            Submit
          </button>

          <button
            onClick={handleClearSurvey}
            className="mb-8 text-indigo-600 px-6 py-2 text-sm cursor-pointer rounded hover:bg-indigo-50 font-bold"
          >
            Clear form
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponderPage;
