import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  dashboard: any;
  notify: boolean;
  loading: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  dashboard: {},
  notify: false,
  loading: false,
  notifyMessage: {},
};

export const fetchProjectDashboard = createAsyncThunk(
  'dashboard/fetchDashboardActivity',
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/dashboard/activity`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const projectDashboardSlice = createSlice({
  name: 'projectDashboardSlice',
  initialState,
  reducers: {
    setDashboardActivity: (state, action: PayloadAction<any[]>) => {
      state.dashboard = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload?.data || {};
      })
      .addCase(fetchProjectDashboard.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      });
  },
});

export const { setDashboardActivity, setNotifyState, showNotifyMessage } =
  projectDashboardSlice.actions;

export default projectDashboardSlice.reducer;
