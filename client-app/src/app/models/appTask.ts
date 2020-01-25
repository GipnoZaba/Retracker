export interface IAppTask {
    id: string;
    orderIndex: number;
    title: string;
    description: string;
    isDone: boolean;
}

export interface IAppTaskFormValues  {
    id: string;
    title?: string;
    description?: string;
}