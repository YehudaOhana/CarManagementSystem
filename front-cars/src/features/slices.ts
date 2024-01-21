import { createSlice } from '@reduxjs/toolkit';

const dataValue = {
  dataSliceName: '',
};
const dataSlice = createSlice({
  name: 'dataSliceName',
  initialState: dataValue,
  reducers: {
    updateState: (state, action) => {
      state.dataSliceName = action.payload.stateVal;
    },
  },
});

export const { updateState } = dataSlice.actions;
export default dataSlice.reducer;
