import {
  createSlice
} from '@reduxjs/toolkit';

const initialState = {
  id: 'All',
  url: 'http://localhost:7070/api/items',
  changeId: false,
  hiddenButtonLoadMore: false,
  cancelDoubleLoading: false,
  data: [],
  loadCategory: "",
  count: "0",
};

export const catalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    addId: (state, action) => {
      if (state.id !== action.payload) {
        state.changeId = true;
      }
      state.id = action.payload;
      state.count = 0;
      state.loadCategory = '';
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
    addData: (state, action) => {
      if (state.id !== state.loadCategory) {
        state.data = ([...action.payload]);
      } else {
        state.data = ([...state.data, ...action.payload]);
      }
    },
    loadMoreItems: (state) => {
      if (state.loadCategory !== state.id || state.changeId) {
        state.changeId = false;
        state.loadCategory = state.id
        state.count = 6
      } else {
        state.count = state.count + 6
      }
    }
  },
});


export const {
  addId,
  addUrlCatalog,
  hiddenButtonLoadMore,
  isLoadingCategory,
  isLoadingCatalog,
  cancelDoubleLoading,
  addData,
  loadMoreItems
} = catalogSlice.actions;

export const selectId = (state) => state;


export default catalogSlice.reducer;