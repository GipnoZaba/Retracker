export interface IAppTask {
  id: string;
  orderIndex: number;
  title: string;
  description: string;
  dateCreated: Date;
  isDone: boolean;
}

export interface IAppTaskFormValues {
  id: string;
  title?: string;
  description?: string;
  dateCreated?: Date;
}
