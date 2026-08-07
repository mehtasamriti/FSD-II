import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./features/posts/postsSlice";
import platformsReducer from "./features/platforms/platformsSlice";
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer,
    counter: counterReducer,
  },
});