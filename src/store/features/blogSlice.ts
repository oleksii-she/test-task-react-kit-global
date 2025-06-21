import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog, IComment } from "@/types";

interface IState {
  loading: boolean;
  commentCollectionId: string;
  blogs: IBlog[];
  comments: IComment[];
}

const initialState: IState = {
  loading: false,
  blogs: [],
  commentCollectionId: "",
  comments: [],
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

    // comments
    addCommentCollectionId: (state, action: PayloadAction<{ id: string }>) => {
      if (state.commentCollectionId === action.payload.id) {
        return;
      }
      state.commentCollectionId = action.payload.id;
      state.comments = [];
    },

    getCommentsApi: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments.unshift(action.payload);
    },
  },
});

export const {
  addBlog,
  deleteBlog,
  getBlogsApi,
  updateBlog,
  addCommentCollectionId,
  getCommentsApi,
  addComment,
} = Blog.actions;
export default Blog.reducer;
