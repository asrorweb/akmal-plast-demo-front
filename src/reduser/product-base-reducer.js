import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: null,
  product: null,
};

const productBaseSlice = createSlice({
  name: "productBase",
  initialState,
  reducers: {
    getAllProductsFromBaseStart: (state) => {
      state.isLoading = true;
    },
    getAllProductsFromBaseSuccses: (state, actions) => {
      state.isLoading = false;
      state.products = actions.payload;
    },
    getAllProductsFromBaseError: (state) => {
      state.isLoading = false;
    },

    // for one product
    getOneProductFromBaseStart: (state) => {
      state.isLoading = true;
    },
    getOneProductFromBaseSuccses: (state, actions) => {
      state.isLoading = false;
      state.product = actions.payload;
    },

    getOneProductFromBaseError: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getAllProductsFromBaseStart,
  getAllProductsFromBaseSuccses,
  getAllProductsFromBaseError,
  getOneProductFromBaseStart,
  getOneProductFromBaseSuccses,
  getOneProductFromBaseError,
} = productBaseSlice.actions;

export default productBaseSlice.reducer;
