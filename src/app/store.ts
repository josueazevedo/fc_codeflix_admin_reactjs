import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  PreloadedState,
} from "@reduxjs/toolkit";
import categoriesReducer, {
  categoriesApiSlice,
} from "../features/categories/categorySlice";
import { apiSlice } from "../features/api/apiSlice";
import { castMembersApiSlice } from "../features/cast-member/castMemberSlice";
import { uploadReducer } from "../features/uploads/uploadSlice";
import { uploadQueue } from "../middleware/uploadQueue";
import { videosSlice } from "../features/videos/videoSlice";
import { genreSlice } from "../features/genre/genreSlice";

// const apiReducer = { [apiSlice.reducerPath]: apiSlice.reducer };

const rootReducer = combineReducers({
  categories: categoriesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  [videosSlice.reducerPath]: apiSlice.reducer,
  [genreSlice.reducerPath]: apiSlice.reducer,
  uploadSlice: uploadReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(uploadQueue.middleware)
        .concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
