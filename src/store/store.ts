import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./features/blogSlice";

export const store = configureStore({
  reducer: {
    blogs: blogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
