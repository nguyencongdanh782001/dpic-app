import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_NAME } from "../../constants/Global";
import * as api from "../../api/index";

export const getuser = createAsyncThunk("/getuser", async () => {
  const { data } = await api.fetchUser();
  return data;
});

export const getalluser = createAsyncThunk("/getalluser", async () => {
  const { data } = await api.fetchAllUser();
  return data;
});

export const signin = createAsyncThunk("/signin", async (value) => {
  try {
    const { data } = await api.signin(value);
    return data;
  } catch (error) {
    console.log("sign in fail");
  }
});
export const signup = createAsyncThunk("/signup", async (value) => {
  try {
    const { data } = await api.signup(value);
    return data;
  } catch (error) {
    console.log("sign up fail");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    alluser:[],
    isLoading: true,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.clear();
      state.user = action?.payload;
    },
  },
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      if (action.payload) {
        localStorage.setItem(
          LOCAL_NAME,
          JSON.stringify(action?.payload?.token)
        );
        state.user = action?.payload?.result;
      }
    },
    [signup.fulfilled]: (state, action) => {
      if (action.payload) {
        localStorage.setItem(
          LOCAL_NAME,
          JSON.stringify(action?.payload?.token)
        );
        state.user = action?.payload?.result;
      }
    },
    [getuser.rejected]: (state, action) => {
        state.user = [];
        state.isLoading = false;
    },
    [getuser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user = action?.payload?.result;
        state.isLoading = false;
      }
    },
    [getalluser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.alluser = action?.payload?.result;
      }
    },
  },
});

const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;

export default authReducer;
