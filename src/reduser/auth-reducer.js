import { setItem } from "@/helpers/persistens-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  isLogin: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isloading = true;
    },
    signUserSuccses: (state, actions) => {
      state.isloading = false;
      state.isLogin = true;
      state.user = actions.payload;
      setItem("token", actions.payload.token);
    },
    signUserError: (state) => {
      state.isloading = false;
    },
    logOutUser: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { signUserStart, signUserSuccses, signUserError, logOutUser } =
  authSlice.actions;

export default authSlice.reducer;
