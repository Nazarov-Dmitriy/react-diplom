import { configureStore } from "@reduxjs/toolkit";
import { customApi } from "./API/customApi";
import mainSlice from "./mainSlice";

export const store = configureStore({
  reducer: {
    [customApi.reducerPath]: customApi.reducer,
    mainSlice: mainSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customApi.middleware),
});
