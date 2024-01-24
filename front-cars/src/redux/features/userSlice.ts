import 'symbol-observable';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateInterface{
  userName:string
  userEmail:string
}

const initialState:initialStateInterface = {
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
