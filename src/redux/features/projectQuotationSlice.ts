import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  projectQuotations: any;
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  projectQuotations: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchProjectQuotations = createAsyncThunk(
  'project-quotations/fetchProjectQuotations',
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/project-quotations/list`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const projectQuotationSlice = createSlice({
  name: 'projectQuotationSlice',
  initialState,
  reducers: {
    setProjectQuotation: (state, action: PayloadAction<any[]>) => {
      state.projectQuotations = action.payload;
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
      .addCase(fetchProjectQuotations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.projectQuotations = action.payload?.data.list || [];
        state.total_count =
          action.payload?.data?.total ||
          action.payload?.data.projects?.length ||
          0;
      })
      .addCase(fetchProjectQuotations.rejected, (state, action: any) => {
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

export const { setProjectQuotation, setNotifyState, showNotifyMessage } =
  projectQuotationSlice.actions;

export default projectQuotationSlice.reducer;
