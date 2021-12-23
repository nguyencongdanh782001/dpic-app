import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/index";

export const getNotify = createAsyncThunk("/getnotify", async () => {
  try {
    const { data } = await api.fetchNotify();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createNotify = createAsyncThunk("/createnotify", async (value) => {
  try {
    const { data } = await api.createNotify(value);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateNotify = createAsyncThunk("/updatenotify", async (value) => {
  try {
    const { data } = await api.updateNotify(value);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteNotify = createAsyncThunk("/deletenotify", async (id) => {
  try {
    const { data } = await api.deleteNotify(id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const seenNotify = createAsyncThunk("/deletenotify", async (id) => {
  try {
    const { data } = await api.seenNotify(id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notify: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    [getNotify.fulfilled]: (state, action) => {
      if (action?.payload) {
        state.notify = action?.payload.result;
        state.isLoading = false;    
      }
    },
    [createNotify.fulfilled]: (state, action) => {
      if (action?.payload) {
        state.notify.push(action?.payload?.result);
      }
    },
    [updateNotify.fulfilled]: (state, action) => {
      if (action?.payload) {
        state.notify = state.notify.map((notify) =>
          notify?._id === action.payload.result._id
            ? action.payload.result
            : {...notify}
        );
      }
    },
    [deleteNotify.fulfilled]: (state, action) => {
      state.notify = state.notify.filter(notify => notify._id !== action.payload.result._id)
    },
    [seenNotify.fulfilled]: (state, action) => {
      if (action?.payload) {
        state.notify = state.notify.map((notify) =>
          notify?._id === action.payload.result?._id
            ? action.payload.result
            : {...notify}
        );
      }
    },
  },
});

const notifyReducer = notifySlice.reducer;

export default notifyReducer;
