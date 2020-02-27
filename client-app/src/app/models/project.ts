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
  id: string;
  dateCreated?: Date;
}

export class ProjectFormValues implements IProjectFormValues {
  id: string = "";
  title?: string = "";
  description?: string = "";
  dateCreated?: Date = undefined;

  constructor(init?: IProjectFormValues) {
    Object.assign(this, init);
  }
}

export interface IProjectList {
  id: string;
  title: string;
  tasks: IProjectTask[];
  dateCreated: Date;
  deadline: Date;
  project: IProject;
}

export interface IProjectListFormValues {
  id: string;
  dateCreated: Date;
  deadline: Date;
  title: string;
  project?: IProject;
}

export interface IProjectTask {
  id: string;
  listId: string;
  title: string;
  isDone: boolean;
  dateCreated: Date;
}

export interface IProjectTaskFormValues extends Partial<IProjectTask> {
  id: string;
  listId: string;
  dateCreated?: Date;
}

export class ProjectTaskFormValues implements IProjectTaskFormValues {
  id: string = "";
  listId: string = "";
  title?: string = "";
  dateCreated?: Date = undefined;
}
