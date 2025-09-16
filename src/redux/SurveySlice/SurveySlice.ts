import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SurveyState {
  surveyHeading: string;
  surveyDescription: string;
  questions: QuestionState[];
}

const initialState: SurveyState = {
  surveyHeading: "",
  surveyDescription: "",
  questions: [
     {
      title: "",
      description: "",
      type: "Paragraph",   // default type
      choices: [],         // empty since Paragraph doesn't need options
      sortOrder: 1
    }
  ],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurveyHeading(state, action: PayloadAction<string>) {
      state.surveyHeading = action.payload;
    },
    setSurveyDescription(state, action: PayloadAction<string>) {
      state.surveyDescription = action.payload;
    },

    setAddQuestion(state, action: PayloadAction<QuestionState>) {
      state.questions.push(action.payload);
    },
    setUpdateQuestion(
      state,
      action: PayloadAction<{ index: number; data: Partial<QuestionState> }>
    ) {
      const { index, data } = action.payload;
      state.questions[index] = { ...state.questions[index], ...data };
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },
    resetSurvey(state) {
      state.surveyHeading = "";
      state.surveyDescription = "";
      state.questions = [];
    },
  },
});

export const {
  setSurveyHeading,
  setSurveyDescription,
  setAddQuestion,
  setUpdateQuestion,
  removeQuestion,
  resetSurvey,
} = surveySlice.actions;

export default surveySlice.reducer;
