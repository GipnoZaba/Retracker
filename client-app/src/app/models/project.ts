import { IUser } from "./user";

export interface IProject {
  id: string;
  title: string;
  description: string;
  dateCreated: Date;
  lists: IProjectList[];
  members: IUser[];
}

export interface IProjectFormValues extends Partial<IProject> {
  dateCreated?: Date;
}

export class ProjectFormValues implements IProjectFormValues {
  id?: string = undefined;
  title?: string = "";
  description?: string = "";
  dateCreated?: Date = undefined;

  constructor(init?: IProjectFormValues) {
    Object.assign(this, init);
  }
}

export interface IProjectList {
  id: string;
  tasks: IProjectTask[];
  deadline: Date;
}

export interface IProjectTask {
  id: string;
  title: string;
  isDone: boolean;
  dateCreated: Date;
}

export interface IProjectTaskFormValues extends Partial<IProjectTask> {
  dateCreated?: Date;
}

export class ProjectTaskFormValues {
  id?: string = undefined;
  title?: string = "";
  dateCreated?: Date = undefined;
}
