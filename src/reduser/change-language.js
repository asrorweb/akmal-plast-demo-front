import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "kiril",
};

export const changeLanguage = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguageTo: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguageTo } = changeLanguage.actions;

export default changeLanguage.reducer;
