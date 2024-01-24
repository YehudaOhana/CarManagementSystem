import 'symbol-observable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface initialStateInterface{
  statusState:number
}

const initialState:initialStateInterface = {
  statusState: 0,
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
    addCustom: (state, action: PayloadAction<number>) => {
      state.statusState += action.payload;
    },
  },
});

export const { add1, reset, addCustom } = mapSlice.actions;
export default mapSlice.reducer
