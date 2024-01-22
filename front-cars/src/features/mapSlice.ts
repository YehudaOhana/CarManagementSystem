import 'symbol-observable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusState: 'status 1',
};

const mapSlice = createSlice({
  name: 'mapSliceName',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.statusState = action.payload.newStatus;
    },
  },
});

export const { setStatus } = mapSlice.actions;

export default mapSlice.reducer;
