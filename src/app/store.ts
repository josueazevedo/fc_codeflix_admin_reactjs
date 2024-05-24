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

// const apiReducer = { [apiSlice.reducerPath]: apiSlice.reducer };

const rootReducer = combineReducers({
  categories: categoriesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
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
