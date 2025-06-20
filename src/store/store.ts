import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./features/blogSlice";
import modalSlice from "./features/modalSlice";
export const store = configureStore({
  reducer: {
    blogs: blogSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
