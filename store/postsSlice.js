import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  title: "",
};

export const postsSlicer = createSlice({
  name: "postsss",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    addTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { addPosts, addTitle } = postsSlicer.actions;

export default postsSlicer.reducer;
