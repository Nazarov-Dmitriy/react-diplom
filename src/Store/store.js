import {
  configureStore
} from "@reduxjs/toolkit";
import {
  customApi
} from "./API/customApi";
import catalogSlice from "./catalogSlice";
import searchSlice from "./searchSlice";
import hiddenButton from "./hiddenButtonLoaded";

export const store = configureStore({
  reducer: {
    [customApi.reducerPath]: customApi.reducer,
    catalogSlice: catalogSlice,
    searchSlice: searchSlice,
    hiddenButton:hiddenButton,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customApi.middleware),
});