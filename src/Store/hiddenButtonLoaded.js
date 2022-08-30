import {
  createSlice
} from '@reduxjs/toolkit';

const initialState = {
  hiddenButtonCatalog: false,
  buttonFlag: false,
  buttonFlagSearch: false,
};

export const hiddenButton = createSlice({
  name: 'hiddenButton',
  initialState,
  reducers: {   
    addhiddenButtonLoadMore: (state, action) => {
      state.hiddenButtonCatalog = action.payload;
    },
    addButtonFlag: (state, action) => {
      state.buttonFlag = action.payload;
    },
    addButtonFlagSearch: (state, action) => {
      state.buttonFlagSearch = action.payload;
    },
  },
});


export const {
  addhiddenButtonLoadMore,
  addButtonFlag,
  addButtonFlagSearch,
} = hiddenButton.actions;

export const hiddenButtonState = (state) => state.hiddenButton;


export default hiddenButton.reducer;