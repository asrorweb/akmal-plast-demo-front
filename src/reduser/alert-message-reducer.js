import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertMassage: null,
  color: "green",
};

export const alertMessage = createSlice({
  name: "alertMessage",
  initialState,
  reducers: {
    showAlertMessage: (state, action) => {
      state.alertMassage = action.payload;
    },
    showAlertMessageColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { showAlertMessage, showAlertMessageColor } = alertMessage.actions;
export default alertMessage.reducer;
