import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../stores';

type AppState = {
  theme: 'light' | 'dark' | null;
  loading: boolean;
};

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme'),
  } as AppState,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<AppState>>) {
      Object.assign(state, action.payload);
      if (action.payload.theme) {
        const body = document.body;

        if (action.payload.theme === 'dark') {
          if (!body.hasAttribute('theme-mode')) {
            body.setAttribute('theme-mode', 'dark');
          }
        } else {
          if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
          }
        }
      }
    },
  },
});

export const { setGlobalState } = appSlice.actions;

export default appSlice.reducer;

export const selectCurrentTheme = (state: RootState) => state.app.theme;
