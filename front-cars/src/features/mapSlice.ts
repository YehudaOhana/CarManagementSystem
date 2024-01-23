import 'symbol-observable';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusState: 1,
  scoundSate: 'hi'
};

const mapSlice = createSlice({
  name: 'mapSliceName',
  initialState,
  reducers: {
    add1: (state) => {
      state.statusState++;
    },
    reset: (state) => {
      state.statusState = 0;
    },
    addCustom: (state, action) => {
      state.statusState += action.payload.custom;
    },
  },
});

export const { add1, reset, addCustom } = mapSlice.actions;

export default mapSlice.reducer;
