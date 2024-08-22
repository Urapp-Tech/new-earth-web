import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import deviceStateReducer from './features/deviceState';
import forgotPasswordSliceReducer from './features/forgotPasswordSlice';
import authModalSliceReducer from './features/authModalSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    forgotPasswordState: forgotPasswordSliceReducer,
    authModalState: authModalSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
