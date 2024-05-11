import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  manufacturedData: null,
  deleteArticle: false,
  isCreated: false,
};

export const addManufactured = createSlice({
  name: "manufacturedProduct",
  initialState,
  reducers: {
    manufacturedProductStart: (state) => {
      state.isloading = true;
    },
    manufacturedProductSuccses: (state, actions) => {
      state.isloading = false;
      state.manufacturedData = actions.payload;
    },
    manufacturedProductError: (state) => {
      state.isloading = false;
    },

    addProductToBaseStart: (state) => {
      state.isloading = true;
    },
    addProductToBaseSuccses: (state) => {
      state.isloading = false;
      state.isCreated = !state.isCreated;
    },
    addProductToBaseError: (state) => {
      state.isloading = false;
    },

    // pagination
    paginationPageManufacture: (state, actions) => {
      state.manufacturedData.pagination.currentPage = actions.payload;
    },
  },
});

export const {
  manufacturedProductStart,
  manufacturedProductError,
  manufacturedProductSuccses,
  addProductToBaseStart,
  addProductToBaseSuccses,
  addProductToBaseError,
  paginationPageManufacture,
} = addManufactured.actions;
export default addManufactured.reducer;
