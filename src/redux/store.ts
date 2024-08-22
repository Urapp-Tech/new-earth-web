import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import deviceStateReducer from './features/deviceState';
import forgotPasswordSliceReducer from './features/forgotPasswordSlice';
import authModalSliceReducer from './features/authModalSlice';
import projectSliceReducer from './features/projectSlice';
import projectPlanSlice from './features/projectPlanSlice';
import projectAttachmentsSlice from './features/projectAttachmentsSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    forgotPasswordState: forgotPasswordSliceReducer,
    authModalState: authModalSliceReducer,
    projectState: projectSliceReducer,
    projectPlanState: projectPlanSlice,
    projectAttachmentsState: projectAttachmentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
