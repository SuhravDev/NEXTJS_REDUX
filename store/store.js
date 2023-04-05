import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import postsSlice from "./postsSlice";
const combinedReducer = combineReducers({
  posts: postsSlice,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      posts: {
        posts: [...action.payload.posts.posts, ...state.posts.posts],
        title: action.payload.posts.title,
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore);
