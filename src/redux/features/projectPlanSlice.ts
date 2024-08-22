import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';;
import { ProjectPlan } from '@/interfaces/project-plans';

type InitialState = {
  plans: ProjectPlan[];
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  plans: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchProjectPlans = createAsyncThunk(
  'projects/fetchProjectPlans',
  async (
    data: {
      project_id: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/new-earth/plans/list/${data.project_id}`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const projectPlanSlice = createSlice({
  name: 'projectPlanSlice',
  initialState,
  reducers: {
    setProjectsPlans: (state, action: PayloadAction<ProjectPlan[]>) => {
      state.plans = action.payload;
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
      .addCase(fetchProjectPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload?.data.list || [];
        state.total_count =
          action.payload?.data?.totalCount ||
          action.payload?.data.projects?.length ||
          0;
      })
      .addCase(fetchProjectPlans.rejected, (state, action: any) => {
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

export const { setProjectsPlans, setNotifyState, showNotifyMessage } =
projectPlanSlice.actions;

export default projectPlanSlice.reducer;
