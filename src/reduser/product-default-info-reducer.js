import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  productDefoultInfoData: null,
  productDefoultInfoSelectOptions: null,
};

const productDefoultInfoSlice = createSlice({
  name: "productDefoultInfo",
  initialState,
  reducers: {
    getAllProductDefoultInfoStart: (state) => {
      state.isloading = true;
    },
    getAllProductDefoultInfoSuccses: (state, action) => {
      state.isloading = false;
      state.productDefoultInfoData = action.payload;
      state.productDefoultInfoSelectOptions = action.payload.map((item) => ({
        value: item._id,
        label: item.name,
      }));
    },
    getAllProductDefoultInfoError: (state) => {
      state.isloading = false;
    },

    // for universal
    productDefoultInfoStart: (state) => {
      state.isloading = true;
    },
    productDefoultInfoSuccses: (state) => {
      state.isloading = false;
    },
    productDefoultInfoError: (state) => {
      state.isloading = false;
    },

    // for create product
    createProductDefaultInfoStart: (state) => {
      state.isloading = true;
    },
    createProductDefaultInfoSuccses: (state) => {
      state.isloading = false;
    },
    createProductDefaultInfoError: (state) => {
      state.isloading = false;
    },
  },
});

export const {
  getAllProductDefoultInfoStart,
  getAllProductDefoultInfoSuccses,
  getAllProductDefoultInfoError,
  productDefoultInfoStart,
  productDefoultInfoSuccses,
  productDefoultInfoError,
  createProductDefaultInfoStart,
  createProductDefaultInfoSuccses,
  createProductDefaultInfoError,
} = productDefoultInfoSlice.actions;

export default productDefoultInfoSlice.reducer;
