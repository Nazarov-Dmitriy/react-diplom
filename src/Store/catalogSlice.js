import {
  createSlice
} from '@reduxjs/toolkit';

const initialState = {
  listCategory: [],
  changeId: false,
  idCategory: 'All',
  url: 'http://localhost:7070/api/items',
  dataCatalog: [],
  count: 6,
  cancelDoubleLoadingFlag: false,
  firstLoadArr: true,
};

export const catalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    addlistCategory: (state, action) => {
      state.listCategory = [action.payload.all, ...action.payload.data]
    },
    addId: (state, action) => {
      if (state.idCategory !== action.payload) {
        state.changeId = true;
      }
      state.idCategory = action.payload;
      state.count = 6;
      state.firstLoadArr = true;

    },
    addUrlCatalog: (state, action) => {

      if (action.payload.buttonFlag && !action.payload.searchFlag) {
        if (state.idCategory !== "All") {
          state.url = `items?categoryId=${state.idCategory}&offset=${state.count}`;
        } else {
          state.url = `items?offset=${state.count}`;
        }
        state.count = state.count + 6;

      } else if (action.payload.searchFlag && !action.payload.buttonFlagSearch) {

        if (state.idCategory !== "All") {
          state.url = `items?categoryId=${state.idCategory}&q=${action.payload.input}`
        } else {
          state.url = `items?q=${action.payload.input}`;
        }
        state.firstLoadArr = true;

      } else if (action.payload.searchFlag && action.payload.buttonFlagSearch) {
        state.firstLoadArr = false;

        if (state.idCategory !== "All") {
          state.url = `items?categoryId=${state.idCategory}&offset=${state.count}&q=${action.payload.input}`
          state.count = state.count + 6;

        } else {
          state.url = `items?offset=${state.count}&q=${action.payload.input}`;
          state.count = state.count + 6;
        }
      } else {
        if (state.idCategory !== "All") {
          state.url = `items?categoryId=${state.idCategory}`;
        } else {
          state.url = `items`;
        }
        state.firstLoadArr = true;

      }
    },
    addData: (state, action) => {
      if (state.firstLoadArr) {
        state.dataCatalog = ([...action.payload.data]);
        state.changeId = false;
        state.firstLoadArr = false;
      } else {
        state.dataCatalog = ([...state.dataCatalog, ...action.payload.data]);
      }
    },
    cancelDoubleLoading: (state, action) => {
      if (action.payload !== undefined) {
        state.cancelDoubleLoadingFlag = action.payload;
        if (state.action.payload) {
          state.dataCatalog = [];
        }
      }
    },

  },
});

export const {
  addId,
  addlistCategory,
  addUrlCatalog,
  addData,
  cancelDoubleLoading,
} = catalogSlice.actions;

export const selectId = (state) => state;


export default catalogSlice.reducer;