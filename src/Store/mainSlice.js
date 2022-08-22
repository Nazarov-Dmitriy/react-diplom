import {
  createSlice
} from '@reduxjs/toolkit';

const initialState = {
  id: 'All',
  url: 'http://localhost:7070/api/items',
  changeId: false,
  hiddenButtonLoadMore: false,
  cancelDoubleLoading: false,
};

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    addId: (state, action) => {
      if (state.id !== action.payload) {
        state.changeId = true;
      }
      state.id = action.payload;
    },
    removeChangeId: (state) => {
      state.changeId = false;
    },
    addUrlCatalog: (state, action) => {
      state.url = action.payload;
    },
    hiddenButtonLoadMore: (state, action) => {
      state.hiddenButtonLoadMore = action.payload;
    },
    cancelDoubleLoading: (state, action) => {
      state.cancelDoubleLoading = action.payload;
    },
  },
});


export const {
  addId,
  addUrlCatalog,
  removeChangeId,
  hiddenButtonLoadMore,
  isLoadingCategory,
  isLoadingCatalog,
  cancelDoubleLoading
} = mainSlice.actions;

export const selectId = (state) => state;


export default mainSlice.reducer;