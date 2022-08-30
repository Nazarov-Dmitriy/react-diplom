import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  input: "",
  searchFlag: false,
  inputFlag: false,
  inputHeader: "",
  searchHeader: false,
  searchFocusFlag: false,
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    addInput: (state, action) => {
      state.input = action.payload;
      state.searchFlag = true;
    },
    addInputFlag: (state, action) => {
      state.inputFlag = action.payload;
    },
    removeSeachFlag: (state, ) => {
      state.searchFlag = false;
      state.input = '';
    },
    addInputHeader: (state, action) => {
      state.inputHeader = action.payload;
    },
    searchHeaderFlag: (state, action) => {
      state.searchHeader = action.payload;
    },
    addSearchFocusFlag: (state, action) => {
      state.searchFocusFlag = action.payload;
    },
  },
});

export const {
  addInput,
  removeSeachFlag,
  addInputFlag,
  addInputHeader,
  searchHeaderFlag,
  addSearchFocusFlag,
  // addSearchUrl,
  // addSeachData,
  // removeSeachData
} = searchSlice.actions;

export const search = (state) => state.searchSlice;

export default searchSlice.reducer;