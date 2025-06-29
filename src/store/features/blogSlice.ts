import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog, IComment } from '@/types/types';
import { parseDate } from '@/utils/utills';

interface IState {
  loading: boolean;
  commentCollectionId: string;
  blogs: IBlog[];
  comments: IComment[];
}

const initialState: IState = {
  loading: false,
  blogs: [],
  commentCollectionId: '',
  comments: [],
};

export const Blog = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog: (state, action: PayloadAction<IBlog>) => {
      state.blogs.unshift(action.payload);
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    getBlogsApi: (state, action: PayloadAction<IBlog[]>) => {
      state.blogs = action.payload ?? [];
    },

    updateBlog: (state, action: PayloadAction<IBlog>) => {
      const index = state.blogs.findIndex((blog) => blog.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },

    sortBlogsDateFilter: (state, action: PayloadAction<'oldest' | 'newest'>) => {
      if (action.payload === 'newest') {
        const sortedNewest = [...state.blogs].sort((a, b) => {
          const dateA = a.createdAt ? parseDate(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? parseDate(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        console.log(sortedNewest, 'sortedNewest');

        state.blogs = sortedNewest;
      } else {
        const sortedOld = [...state.blogs].sort((a, b) => {
          const dateA = a.createdAt ? parseDate(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? parseDate(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });

        state.blogs = sortedOld;
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
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter((blog) => blog.id !== action.payload);
    },

    updateComment: (state, action: PayloadAction<Partial<IComment> & { id: string }>) => {
      const index = state.comments.findIndex((comment) => comment.id === action.payload.id);

      if (index !== -1) {
        state.comments[index] = {
          ...state.comments[index],
          ...action.payload,
        };
      }
    },

    sortCommentsDateFilter: (state, action: PayloadAction<'oldest' | 'newest'>) => {
      if (action.payload === 'newest') {
        const sortedNewest = [...state.comments].sort((a, b) => {
          const dateA = a.createdAt ? parseDate(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? parseDate(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        state.comments = sortedNewest;
      } else {
        const sortedOld = [...state.comments].sort((a, b) => {
          const dateA = a.createdAt ? parseDate(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? parseDate(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        state.comments = sortedOld;
      }
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
  deleteComment,
  updateComment,
  sortCommentsDateFilter,
  sortBlogsDateFilter,
} = Blog.actions;
export default Blog.reducer;
