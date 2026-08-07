import {
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: (state, action) => {
      postsAdapter.addOne(
        state,
        action.payload
      );
    },

    updatePost: (state, action) => {
      postsAdapter.updateOne(
        state,
        action.payload
      );
    },

    deletePost: (state, action) => {
      postsAdapter.removeOne(
        state,
        action.payload
      );
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;