import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import authModalSliceReducer from './features/authModalSlice';
import authStateReducer from './features/authStateSlice';
import deviceStateReducer from './features/deviceState';
import forgotPasswordSliceReducer from './features/forgotPasswordSlice';
import projectAttachmentsSlice from './features/projectAttachmentsSlice';
import projectPlanSlice from './features/projectPlanSlice';
import projectQuotationSlice from './features/projectQuotationSlice';
import projectSliceReducer from './features/projectSlice';
import quotationSlice from './features/quotationSlice';
import projectDashboardSlice from './features/projectDashboardSlice';

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
    projectQuotationState: projectQuotationSlice,
    quotationState: quotationSlice,
    projectdashboardState: projectDashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
