import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Quotation from '@/interfaces/Quotation';

type InitialState = {
  quotations: Quotation[];
  selectedQuotation?: Quotation;
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  quotations: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};



export const fetchQuotations = createAsyncThunk(
  'quotations/fetchQuotations',
  async (
    data: {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/quotations/list`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchQuotationDetails = createAsyncThunk(
  'quotations/fetchQuotationDetails',
  async (
    data: { id?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/quotations/find/${data.id}`,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const quotationSlice = createSlice({
  name: 'quotationSlice',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Quotation[]>) => {
      state.quotations = action.payload;
    },
    setSelectedProject: (state, action: PayloadAction<Quotation | undefined>) => {
      state.selectedQuotation = action.payload;
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
      .addCase(fetchQuotations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotations.fulfilled, (state, action) => {
        state.loading = false;
        state.quotations = action.payload?.data.list || [];
        state.total_count =
          action.payload?.data?.totalCount ||
          action.payload?.data.projects?.length ||
          0;
      })
      .addCase(fetchQuotations.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      })
      .addCase(fetchQuotationDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuotation = action.payload?.data || {};
      })
      .addCase(fetchQuotationDetails.rejected, (state, action: any) => {
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

export const { setProjects, setNotifyState, showNotifyMessage, setSelectedProject } =
quotationSlice.actions;

export default quotationSlice.reducer;
