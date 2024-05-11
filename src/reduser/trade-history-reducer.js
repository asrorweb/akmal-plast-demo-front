import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingTradeHistory: false,
  allTradeHistoryData: null,
  tradeHistoryData: null,
};

export const tradeHistorySlice = createSlice({
  name: "tradeHistory",
  initialState,
  reducers: {
    getTradeHistoryStart: (state) => {
      state.isLoadingTradeHistory = true;
    },
    getAllTradeHistorySuccess: (state, action) => {
      state.isLoadingTradeHistory = false;
      state.allTradeHistoryData = action.payload;
    },
    getAllTradeHistoryError: (state) => {
      state.isLoadingTradeHistory = false;
    },
    getTradeHistorySuccess: (state, action) => {
      state.tradeHistoryData = action.payload;
      state.isLoadingTradeHistory = false;
    },
    getTradeHistoryError: (state) => {
      state.tradeHistoryData = null;
      state.isLoadingTradeHistory = false;
    },

    // pagination
    paginationPageTradeHistory: (state, actions) => {
      state.allTradeHistoryData.pagination.currentPage = actions.payload;
    },
  },
});

export const {
  getAllTradeHistoryError,
  getTradeHistoryStart,
  getAllTradeHistorySuccess,
  getTradeHistoryError,
  getTradeHistorySuccess,
  paginationPageTradeHistory,
} = tradeHistorySlice.actions;

export default tradeHistorySlice.reducer;
