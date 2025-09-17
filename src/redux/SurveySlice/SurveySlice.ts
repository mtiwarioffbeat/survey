import { Survey } from "@/types/survey";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// interface SurveyState {
//   surveyHeading: string;
//   surveyDescription: string;
//   questions: QuestionState[];
// }

// const initialState: SurveyState = {
//   surveyHeading: "",
//   surveyDescription: "",
//   questions: [
//      {
//       title: "",
//       description: "",
//       type: "Paragraph",   // default type
//       choices: [],         // empty since Paragraph doesn't need options
//       sortOrder: 1
//     }
//   ],
// };
const initialState: Survey['Survey'] = {
  name: "",
  description: "",
  isPublished:false,
  isOpenedInEditMode:true,
  // editModeStartDateTime:
  questions: [
     {
      title: "",
      description: "",
      type: {
        name:'Paragraph',
        description:null
      },                    // default type
      choices: [],         // empty  Paragraph doesn't need 
    }
  ],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurveyHeading(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSurveyDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },

    setAddQuestion(state, action: PayloadAction<Survey['Question']>) {
      state.questions.push(action.payload);
    },
    setUpdateQuestion(
      state,
      action: PayloadAction<{ index: number; data: Partial<Survey['Question']> }>
    ) {
      const { index, data } = action.payload;
      state.questions[index] = { ...state.questions[index], ...data };
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },
    resetSurvey(state) {
      state.name = "";
      state.description = "";
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
