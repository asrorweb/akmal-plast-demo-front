import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  isloading: false,
  deleteData: null, // id, title, titleUz
  isdeleted: false,
};

export const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    showDeleteModal: (state, actions) => {
      state.isShow = true;
      state.deleteData = actions.payload;
    },
    hideDeleteModal: (state) => {
      state.isShow = false;
      state.deleteData = null;
    },

    deleteElementStart: (state) => {
      state.isloading = true;
    },
    deleteElementSuccses: (state) => {
      state.isloading = false;
      state.isdeleted = !state.isdeleted;
    },
    deleteElementEror: (state) => {
      state.isloading = false;
    },
  },
});

export const {
  showDeleteModal,
  hideDeleteModal,
  deleteElementStart,
  deleteElementSuccses,
  deleteElementEror,
} = deleteModalSlice.actions;

export default deleteModalSlice.reducer;
