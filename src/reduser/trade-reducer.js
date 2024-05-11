import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProoducts: [],
  selectedProduct: {},
  selectProductOptionData: null,
  selectMaterProductOptionData: null,
  selectId: "",
  isLoadingProducts: false,

  isLoadingTrades: false,
  isRegularClient: false,
  saleBasket: [],
  saleKash: null,

  summaFromClient: 0,
  tradeSumm: 0,
  clientInformation: {
    name: "",
    number: "",
  },

  isShow: false,
};

export const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    isLoadingTradesStart: (state) => {
      state.isLoadingTrades = true;
    },
    isLoadingTradesSuccses: (state) => {
      state.isLoadingTrades = false;
    },
    isLoadingTradesError: (state) => {
      state.isLoadingTrades = false;
    },

    addSaleProductFromSaleKashToSaleBasket: (state) => {
      state.saleBasket.push(saleKash);
    },
    addInfoToSaleKash: (state, action) => {
      state.saleKash = { ...state.saleKash, ...action.payload };
    },
    updateAllProductAndPushSaleKashToSaleBasket: (state, action) => {
      state.allProoducts = action.payload;
      state.saleKash = {
        ...state.saleKash,
        saleSum: state.saleKash.salePrice * state.saleKash.saleMater,
        productId: state.selectId,
      };
      state.saleBasket.unshift(state.saleKash);

      state.selectedProduct = {};
      state.saleKash = null;
      state.selectId = "";

      let sumKash = 0;
      state.saleBasket.map((sum) => {
        sumKash += sum.saleSum;
      });
      state.tradeSumm = sumKash;
    },

    changeIsRegularClient: (state, action) => {
      state.isRegularClient = action.payload;
      state.selectedProduct = {};
      state.saleKash = null;
      state.selectId = "";
      state.saleBasket = [];
      state.tradeSumm = 0;
    },
    clearAllTradeData: (state) => {
      state.selectedProduct = {};
      state.saleKash = null;
      state.selectId = "";
      state.saleBasket = [];
      state.summaFromClient = 0;
      state.tradeSumm = 0;
    },
    summFromClientChange: (state, action) => {
      state.summaFromClient = action.payload;
    },
    selectIdChange: (state, action) => {
      state.selectId = action.payload;
      state.selectedProduct = state.allProoducts.find(
        (product) => product._id === action.payload
      );
      state.saleKash = {
        ...state.saleKash,
        salePrice: state.isRegularClient
          ? state.selectedProduct?.productType?.priceWholesale
          : state.selectedProduct?.productType?.priceRetail,
        name: state.selectedProduct?.productType?.name,
      };

      state.selectMaterProductOptionData = state.selectedProduct.quantity.map(
        (item) => ({
          value: item._id,
          label: item.meter,
        })
      );
    },
    addClientInfo: (state, action) => {
      state.clientInformation = action.payload;
    },

    getAllProductsFromBaseForTradeStart: (state) => {
      state.isLoadingProducts = true;
    },
    getAllProductsFromBaseForTradeSuccess: (state, action) => {
      state.isLoadingProducts = false;
      state.allProoducts = action.payload;
      state.selectProductOptionData = action.payload.map((item) => ({
        value: item._id,
        label: item.productType.name,
      }));

      state.saleBasket = [];
    },
    getAllProductsFromBaseForTradeError: (state) => {
      state.isLoadingProducts = false;
    },

    showTradeModal: (state) => {
      state.isShow = true;
    },

    hideTradeModal: (state) => {
      state.isShow = false;
    },
  },
});

export const {
  isLoadingTradesStart,
  isLoadingTradesSuccses,
  isLoadingTradesError,
  addSaleProductFromSaleKashToSaleBasket,
  changeIsRegularClient,
  selectIdChange,
  addClientInfo,
  updateAllProductAndPushSaleKashToSaleBasket,
  addInfoToSaleKash,
  selectSaleMater,
  clearAllTradeData,
  summFromClientChange,
  getAllProductsFromBaseForTradeStart,
  getAllProductsFromBaseForTradeSuccess,
  getAllProductsFromBaseForTradeError,
  showTradeModal,
  hideTradeModal,
} = tradesSlice.actions;

export default tradesSlice.reducer;
