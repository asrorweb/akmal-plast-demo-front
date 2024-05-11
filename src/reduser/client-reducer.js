import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingClient: false,
  clients: [],
  client: [],
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    // universal
    clientsStart: (state) => {
      state.isLoadingClient = true;
    },
    clientsSuccses: (state) => {
      state.isLoadingClient = false;
    },
    clientsError: (state) => {
      state.isLoadingClient = false;
    },

    //get client
    getAllClientStart: (state) => {
      state.isLoadingClient = true;
    },
    getAllClientSuccses: (state, action) => {
      state.isLoadingClient = false;
      state.clients = action.payload;
    },
    getAllClientError: (state) => {
      state.isLoadingClient = false;
    },
  },
});

export const {
  clientsError,
  clientsSuccses,
  clientsStart,
  getAllClientError,
  getAllClientSuccses,
  getAllClientStart,
} = clientSlice.actions;

export default clientSlice.reducer;
