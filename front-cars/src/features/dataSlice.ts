import { createSlice } from '@reduxjs/toolkit';

const dataValue = {
  dataSliceName: '',
};
const dataSlice = createSlice({
  name: 'dataSliceName',
  initialState: dataValue,
  reducers: {},
});

export default dataSlice.reducer;
