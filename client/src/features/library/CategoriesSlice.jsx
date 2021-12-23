import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/index";

export const getCategories = createAsyncThunk("/getcategories", async () => {
  try {
    const { data } = await api.fetchCategories();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createCategory = createAsyncThunk(
  "/createcategory",
  async (value) => {
    try {
      const { data } = await api.createCategory(value);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/updatecategory",
  async (value) => {
    try {
      const { data } = await api.updateCategory(value);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "/deletecategory",
  async (id) => {
    try {
      const { data } = await api.deleteCategory(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "libcategories",
  initialState: {
    LibCategories: [],
    isLoading:true
  },
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      if (action.payload) {
        state.LibCategories = action.payload.result;
        state.isLoading = false
      }
    },
    [createCategory.fulfilled]: (state, action) => {
      if (action.payload) {
        state.LibCategories.push(action.payload.result);
      }
    },
    [updateCategory.fulfilled]: (state, action) => {
      if (action.payload) {
        state.LibCategories = state.LibCategories.map((category) =>
          category._id === action.payload.result._id
            ? action.payload.result
            : { ...category }
        );
      }
    },
    [deleteCategory.fulfilled]: (state, action) => {
      if (action.payload) {
        state.LibCategories = state.LibCategories.filter(
          (category) => category._id !== action.payload.result._id
        );
      }
    },
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
