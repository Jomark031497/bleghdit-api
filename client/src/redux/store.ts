import { combineReducers, configureStore } from "@reduxjs/toolkit";
import login from "./features/loginSlice";
import { useDispatch } from "react-redux";

// combine all reducers into 1
const rootReducer = combineReducers({ login });

// create the store and add the reducer functions
const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
