import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./towns/slice";
import userReducer from "./user/slice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;