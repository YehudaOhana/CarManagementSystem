import 'symbol-observable';
import { createSlice } from '@reduxjs/toolkit';
import {loginMutation} from '../service/mutation';

interface initialStateInterface {
  userName: string;
  userEmail: string;
  loading: boolean;
  error: string;
}

const initialState: initialStateInterface = {
  userName: '',
  userEmail: '',
  loading: false,
  error: '',
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
  extraReducers(builder) {
    builder.addCase(loginMutation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginMutation.fulfilled, (state, { payload }) => {
      state.userEmail = payload.query.userByEmail.email;
      state.userName = payload.query.userByEmail.name;
      localStorage.setItem('token', payload.jwtToken);
      state.loading = false;
    });
    builder.addCase(loginMutation.rejected, (state, { error }) => {
      state.error = error.message || '';
      state.loading = false;
    });
  },
});

export const { setName, setEmail } = userSlice.actions;

export default userSlice.reducer;
