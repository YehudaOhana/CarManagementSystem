import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import mapSlice from './features/mapSlice';

export const store = configureStore({
  reducer: { userSlice, mapSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
