import {
  createSlice
} from "@reduxjs/toolkit";

const initialState = {
  input: "",
  inputHeader: "",
  searchFlag: false,
  searchData: [],
  searchUrl: '',
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
    addInputHeader: (state, action) => {
      state.inputHeader = action.payload;
    },
    searchHeaderFlag: (state, action) => {
      state.searchHeader = action.payload;
    },
    addSearchUrl: (state, action) => {
      state.searchUrl = action.payload;
    },
    addSearchFocusFlag: (state,action) => {
      state.searchFocusFlag = action.payload;
    },
    removeSeachFlag: (state, ) => {
      state.searchFlag = false;
      state.input = '';
    },

    addSeachData: (state, action) => {
      if (action.payload.catalogId !== action.payload.loadIdCatagory) {
        state.searchData = ([...action.payload.data]);
      } else {
        state.searchData = ([...state.searchData, ...action.payload.data]);
      }
    },
  },
});

export const {
  addInput,
  removeSeachFlag,
  addSearchUrl,
  addSeachData,
  searchHeaderFlag,
  addInputHeader,
  addSearchFocusFlag
} = searchSlice.actions;

export const search = (state) => state.searchSlice;

export default searchSlice.reducer;