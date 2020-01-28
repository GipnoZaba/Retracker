import { IUser } from "./user";

export interface IProject {
  id: string;
  title: string;
  description: string;
  dateCreated: Date;
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
}
