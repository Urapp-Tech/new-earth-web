export interface ProjectAttachment {
  id: string;
  title: string;
  description: string;
  day: string;
  projectId: string;
  tenant: string;
  filePath: string;
  attachmentType: string;
  fileSize: string;
  mimeType: string;
  uploadedAt: string;
  status: string;
  isDeleted: boolean;
  deletedAt: string | null;
  projectName: string;
  projectStartDate: string;
  category: string;
}
