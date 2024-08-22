export interface Activity {
  room: string;
  count: number;
  stage: string;
  remarks: string;
  activity: string;
  jobType: string;
  progress: number;
  supervisor: string;
}

export interface ProjectPlan {
  id: string;
  projectId: string;
  day: string;
  data: Activity[];
  room: string | null;
  tenant: string;
  stage: string | null;
  projectName: string;
  projectStartDate: string;
}
