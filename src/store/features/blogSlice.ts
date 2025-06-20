import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "@/types";

interface IState {
  loading: boolean;
  blogs: IBlog[];
}

const initialState: IState = {
  loading: false,
  blogs: [],
};

export const Blog = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs.unshift(action.payload);
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    getBlogsApi: (state, action: PayloadAction<IBlog[]>) => {
      state.blogs = action.payload;
    },

    updateBlog: (state, action: PayloadAction<IBlog>) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
  },
});

export const { addBlog, deleteBlog, getBlogsApi, updateBlog } = Blog.actions;
export default Blog.reducer;
