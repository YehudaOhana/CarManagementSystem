import 'symbol-observable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  userEmail: '',
};

const userSlice = createSlice({
  name: 'userSliceName',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.userName = action.payload.name;
    },
    setEmail: (state, action) => {
      state.userEmail = action.payload.email;
    },
  },
});

export const { setName, setEmail } = userSlice.actions;

export default userSlice.reducer;
