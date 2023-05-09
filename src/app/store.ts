import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import {api} from "./api/api";
import tabDataReducer from "./slices/tabDataSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        tabData: tabDataReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;