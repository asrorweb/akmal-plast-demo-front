import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  id: "",
};

const modalQuestSlice = createSlice({
  name: "modalQuest",
  initialState,
  reducers: {
    showModalQuest: (state, action) => {
      state.isShow = true;
      state.id = action.payload;
    },
    hideModalQuest: (state, action) => {
      state.isShow = false;
      state.id = "";
    },
  },
});

export const { hideModalQuest, showModalQuest } = modalQuestSlice.actions;

export default modalQuestSlice.reducer;
