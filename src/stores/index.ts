import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/App/appSlice';
import authReducer from '../features/Login/authSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
