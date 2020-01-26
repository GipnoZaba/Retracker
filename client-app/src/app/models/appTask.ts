export interface IAppTask {
    id: string;
    orderIndex: number;
    title: string;
    description: string;
    date: Date;
    isDone: boolean;
}

export interface IAppTaskFormValues  {
    id: string;
    title?: string;
    description?: string;
    date?: Date;
}