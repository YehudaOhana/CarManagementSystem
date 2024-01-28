import { createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '../../services/apolloClient';
import { LOGIN } from '../../graphQL/schemaUsers';

type user = {
  email: string;
  password: string;
};

export const loginMutation = createAsyncThunk('login', async (user: user) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN,
      variables: user,
    });
    return data.authenticate;
  } catch (error) {
    return error;
  }
});

