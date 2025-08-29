export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
}
