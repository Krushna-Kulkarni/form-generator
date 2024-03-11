import { configureStore } from "@reduxjs/toolkit";
import formFieldsReducer from "../slices/formFieldsSlice";

export const store = configureStore({
  reducer: formFieldsReducer,
});
