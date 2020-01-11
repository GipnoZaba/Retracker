export interface IAppTask {
    id: string;
    orderIndex: number;
    title: string;
    description?: string;
    isDone?: boolean;
}