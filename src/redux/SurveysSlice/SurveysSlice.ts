import { Surveys } from "../../types/survey";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Surveys[] = [];

const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    setSurveys(_state, action: PayloadAction<Surveys[]>) {
      return action.payload;
    },
  },
});

export const { setSurveys } = surveysSlice.actions;
export default surveysSlice.reducer;
