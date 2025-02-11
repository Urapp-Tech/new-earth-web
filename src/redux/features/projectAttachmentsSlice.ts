import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProjectAttachment } from '@/interfaces/project-attachments';

type InitialState = {
  attachments: ProjectAttachment[] | any;
  daywiseAttachments: any;
  loading: boolean;
  notify: boolean;
  total_count: number;
  daywise_total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  attachments: [],
  daywiseAttachments: [],
  total_count: 0,
  daywise_total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchProjectAttachments = createAsyncThunk(
  'projects/fetchProjectAttachments',
  async (
    data: {
      project_id: string | any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/attachments/list/${data.project_id}`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectDaywiseAttachments = createAsyncThunk(
  'projects/daywise/fetchProjectAttachments',
  async (
    data: {
      project_id: string | any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/attachments/list/daywise/${data.project_id}`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const projectAttachmentsSlice = createSlice({
  name: 'projectAttachmentsSlice',
  initialState,
  reducers: {
    setProjectsAttachments: (
      state,
      action: PayloadAction<ProjectAttachment[]>
    ) => {
      state.attachments = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
    setProjectsAttachmentsDaywise: (state, action: PayloadAction<any>) => {
      state.daywiseAttachments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectAttachments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectAttachments.fulfilled, (state, action) => {
        state.loading = false;
        state.attachments = action.payload?.data.list || [];
        state.total_count =
          action.payload?.data?.totalCount ||
          action.payload?.data.projects?.length ||
          0;
      })
      .addCase(fetchProjectAttachments.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      })
      .addCase(fetchProjectDaywiseAttachments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectDaywiseAttachments.fulfilled, (state, action) => {
        state.loading = false;
        state.daywiseAttachments = action.payload?.data.list || [];
        state.daywise_total_count =
          action.payload?.data?.totalCount ||
          action.payload?.data.projects?.length ||
          0;
      })
      .addCase(
        fetchProjectDaywiseAttachments.rejected,
        (state, action: any) => {
          state.loading = false;
          if (action.error) {
            state.notifyMessage = {
              text: `Something went wrong. Error: ${action.error.message}`,
              type: 'error',
            };
            state.notify = true;
          }
        }
      );
  },
});

export const {
  setProjectsAttachments,
  setProjectsAttachmentsDaywise,
  setNotifyState,
  showNotifyMessage,
} = projectAttachmentsSlice.actions;

export default projectAttachmentsSlice.reducer;
