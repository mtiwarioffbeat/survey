import { Survey } from "@/types/survey";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Survey["Survey"] = {
  title: "",
  description: "",
  isDeleted:false,
  isPublished: false,
  isOpenedInEditMode: true,
  // createdBy: null,
  questions: [
    { 
      title: "",
      description: "",
      isDeleted:false,
      sortOrder:null,
      type: {
        title: "Paragraph",
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
    setSurvey(state, action: PayloadAction<Survey["Survey"]>) {
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

    setRemoveQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },

    resetSurvey() {
      return initialState;
    },
  },
});

export const { setSurvey, setAddQuestion, setUpdateQuestion, setRemoveQuestion, resetSurvey } =
  surveySlice.actions;

export default surveySlice.reducer;
