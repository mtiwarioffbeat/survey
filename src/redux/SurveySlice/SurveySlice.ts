import { Survey } from "@/types/survey";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Survey["Survey"] = {
  name: "",
  description: "",
  isPublished: false,
  isOpenedInEditMode: true,
  // createdBy: null,
  questions: [
    {
      title: "",
      description: "",
      type: {
        name: "Paragraph",
        description: null,
      },
      choices: [],
      // enteredBy: null 
    },
  ],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurvey(state, action: PayloadAction<Partial<Survey["Survey"]>>) {
      return { ...state, ...action.payload };
    },

    setAddQuestion(state, action: PayloadAction<Survey["Question"]>) {
      state.questions.push(action.payload);
    },

    setUpdateQuestion(
      state,
      action: PayloadAction<{ index: number; data: Partial<Survey["Question"]> }>
    ) {
      const { index, data } = action.payload;
      state.questions[index] = { ...state.questions[index], ...data };
    },

    removeQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },

    resetSurvey() {
      return initialState;
    },
  },
});

export const { setSurvey, setAddQuestion, setUpdateQuestion, removeQuestion, resetSurvey } =
  surveySlice.actions;

export default surveySlice.reducer;
