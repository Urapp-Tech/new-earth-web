import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Project } from '../../interfaces/project';
import LocalStorageUtil from '@/utils/LocalStorageUtil';

type InitialState = {
  projects: Project[];
  selectedProjects?: Project | any;
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};
const storedSelectedProject = LocalStorageUtil.getItem<any>('SELECTED_PROJECT');

const initialState: InitialState = {
  projects: [],
  selectedProjects: storedSelectedProject,
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (data: {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/app/new-earth/projects/list`, {
        params: data,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setSelectedProject: (state, action: PayloadAction<Project | undefined>) => {
      LocalStorageUtil.setItem('SELECTED_PROJECT', action.payload);
      state.selectedProjects = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
    setRemoveProject: (state) => {
      LocalStorageUtil.removeItem('SELECTED_PROJECT');
      state.projects = [];
      state.selectedProjects = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload?.data.list || [];
        state.total_count =
          action.payload?.data?.totalCount ||
          action.payload?.data.projects?.length ||
          0;
      })
      .addCase(fetchProjects.rejected, (state, action: any) => {
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

export const {
  setProjects,
  setNotifyState,
  showNotifyMessage,
  setSelectedProject,
  setRemoveProject,
} = projectSlice.actions;

export default projectSlice.reducer;
