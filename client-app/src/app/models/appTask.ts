export interface IAppTask {
  id: string;
  orderIndex: number;
  title: string;
  description: string;
  deadline: Date;
  dateCreated: Date;
  isDone: boolean;
}

export interface IAppTaskFormValues {
  id: string;
  title?: string;
  description?: string;
  deadline?: Date;
  dateCreated?: Date;
}
