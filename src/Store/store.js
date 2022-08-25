import {
  configureStore
} from "@reduxjs/toolkit";
import {
  customApi
} from "./API/customApi";
import catalogSlice from "./catalogSlice";
import searchSlice from "./searchSlice";

export const store = configureStore({
  reducer: {
    [customApi.reducerPath]: customApi.reducer,
    catalogSlice: catalogSlice,
    searchSlice: searchSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customApi.middleware),
});