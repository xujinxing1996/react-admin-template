import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/userTypes';
import { RootState } from '../../stores';

type AuthState = {
  user: User | null;
  token: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
