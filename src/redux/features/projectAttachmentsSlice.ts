import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';;
import { ProjectAttachment } from '@/interfaces/project-attachments';

type InitialState = {
  attachments: ProjectAttachment[];
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  attachments: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchProjectAttachments = createAsyncThunk(
  'projects/fetchProjectAttachments',
  async (
    data: {
      project_id: string
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

export const projectAttachmentsSlice = createSlice({
  name: 'projectAttachmentsSlice',
  initialState,
  reducers: {
    setProjectsAttachments: (state, action: PayloadAction<ProjectAttachment[]>) => {
      state.attachments = action.payload;
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
      });
  },
});

export const { setProjectsAttachments, setNotifyState, showNotifyMessage } =
projectAttachmentsSlice.actions;

export default projectAttachmentsSlice.reducer;
