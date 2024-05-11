import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  workers: null,
  worker: null,
};

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    workersStart: (state) => {
      state.isloading = true;
    },
    workersSuccses: (state, actions) => {
      state.isloading = false;
      state.workers = actions.payload;
    },
    workersError: (state) => {
      state.isloading = false;
    },

    // for get worker
    getWorkerStart: (state) => {
      state.isloading = true;
    },
    getWorkerSuccses: (state, actions) => {
      state.isloading = false;
      state.worker = actions.payload;
    },
    getWorkerError: (state) => {
      state.isloading = false;
    },

    // for register
    workerRegisterStart: (state) => {
      state.isloading = true;
    },
    workerRegisterSuccses: (state) => {
      state.isloading = false;
    },
    workerRegisterError: (state) => {
      state.isloading = false;
    },

    // for update
    workerUpdateStart: (state) => {
      state.isloading = true;
    },
    workerUpdateSuccses: (state) => {
      state.isloading = false;
    },
    workerUpdateError: (state) => {
      state.isloading = false;
    },
  },
});

export const {
  workersStart,
  workersSuccses,
  workersError,
  workerRegisterStart,
  workerRegisterSuccses,
  workerRegisterError,
  workerUpdateStart,
  workerUpdateSuccses,
  workerUpdateError,
  getWorkerStart,
  getWorkerSuccses,
  getWorkerError,
} = workersSlice.actions;

export default workersSlice.reducer;
