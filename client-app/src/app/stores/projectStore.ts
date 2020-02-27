import { observable, action, runInAction, computed, toJS } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import {
  IProject,
  IProjectList,
  IProjectFormValues,
  IProjectTaskFormValues,
  IProjectTask,
  IProjectListFormValues
} from "../models/project";
import {
  messageErrorRetrieve,
  messageErrorSubmit
} from "../common/utils/utilities";
import { IStore } from "./store";
import { compareAsc } from "date-fns";

export default class ProjectStore implements IStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.appProjectsRegistry.clear();
    this.loadingInitial = false;
    this.submitting = false;
  }

  appProjectsRegistryKey = "appProjectsRegistryKey";

  @observable appProjectsRegistry = new Map<string, IProject>();
  @observable currentProjectId: string = "";
  @observable submitting = false;
  @observable loadingInitial = false;

  @action loadProjects = async () => {
    this.loadingInitial = true;
    try {
      const projects = await agent.Projects.list();

      runInAction("loading projects", () => {
        projects.forEach(project => {
          this.appProjectsRegistry.set(project.id, project);
        });

        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load projects error", () => {
        this.loadingInitial = false;
      });
      toast.error(messageErrorRetrieve);
    }
  };

  projectListsByDate(id: string) {
    const project = this.appProjectsRegistry.get(id);
    if (project) {
      return this.groupProjectListsByDate(project.lists);
    }
    return null;
  }

  groupProjectListsByDate(lists: IProjectList[]) {
    const sortedLists = lists.sort((a, b) =>
      compareAsc(new Date(a.deadline), new Date(b.deadline))
    );

    return Object.entries(
      sortedLists.reduce((lists, list) => {
        const deadline = new Date(list.deadline);

        const group = deadline.toISOString().split("T")[0];
        lists[group] = lists[group] ? [...lists[group], list] : [list];
        return lists;
      }, {} as { [key: string]: IProjectList[] })
    );
  }

  @action createProject = async (formValues: IProjectFormValues) => {
    this.submitting = true;
    try {
      formValues.dateCreated = formValues.dateCreated ?? new Date();
      await agent.Projects.create(formValues);

      runInAction("create project", () => {
        if (formValues.title) {
          var project: IProject = {
            id: formValues.id,
            title: formValues.title,
            description: "",
            dateCreated: formValues.dateCreated ?? new Date(),
            lists: [],
            members: []
          };
          this.appProjectsRegistry.set(project.id, project);
        }

        this.submitting = false;
      });
    } catch (error) {
      runInAction("create project error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  @action createProjectList = async (formValues: IProjectListFormValues) => {
    this.submitting = true;
    try {
      formValues.dateCreated = formValues.dateCreated ?? new Date();
      formValues.deadline = formValues.deadline ?? new Date();
      formValues.deadline.setUTCHours(5); // otherwise sets to 00:00:00 and later transforms to previous day
      var project = this.appProjectsRegistry.get(this.currentProjectId);
      formValues.project = project;
      await agent.ProjectLists.create(formValues);

      runInAction("create project list", () => {
        if (formValues.title) {
          if (project) {
            var projectList: IProjectList = {
              id: formValues.id,
              title: formValues.title,
              dateCreated: formValues.dateCreated ?? new Date(),
              deadline: formValues.dateCreated ?? new Date(),
              project: project,
              tasks: []
            };
            this.appProjectsRegistry
              .get(this.currentProjectId)
              ?.lists.push(projectList);
          }
        }

        this.rootStore.modalStore.closeModal();
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create project list error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  @action createProjectTask = async (formValues: IProjectTaskFormValues) => {
    this.submitting = true;
    try {
      formValues.dateCreated = formValues.dateCreated ?? new Date();
      await agent.ProjectTasks.create(formValues);

      runInAction("create project task", () => {
        if (formValues.title) {
          var projectTask: IProjectTask = {
            id: formValues.id,
            listId: formValues.listId,
            title: formValues.title,
            dateCreated: formValues.dateCreated ?? new Date(),
            isDone: false
          };
          this.getProjectListById(projectTask.listId)?.tasks.push(projectTask);
        }

        this.submitting = false;
      });
    } catch (error) {
      runInAction("create project task error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  @action deleteProject = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Projects.delete(id);

      runInAction("deleting project", () => {
        this.appProjectsRegistry.delete(id);

        this.submitting = false;
      });
    } catch (error) {
      runInAction("delete project error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  @action loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project) {
      this.currentProjectId = project.id;
      return toJS(project);
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.details(id);
        runInAction("getting project", () => {
          if (project) {
            this.currentProjectId = project.id;
            this.appProjectsRegistry.set(project.id, project);
            this.loadingInitial = false;
          }
        });
        return toJS(project);
      } catch (error) {
        runInAction(messageErrorRetrieve, () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  @computed get projectsByOrder() {
    return this.sortByDate(Array.from(this.appProjectsRegistry.values()));
  }

  sortByDate(projects: IProject[]) {
    return projects.sort(
      (a, b) =>
        new Date(a.dateCreated).getDay() - new Date(b.dateCreated).getDay()
    );
  }

  getProject(id: string) {
    return this.appProjectsRegistry.get(id);
  }

  getProjectListById(id: string) {
    var lists = this.appProjectsRegistry.get(this.currentProjectId)?.lists;
    if (!lists) return null;

    for (var i = 0; i < lists?.length; i++) {
      if (lists[i].id === id) {
        console.log(lists[i]);
        return lists[i];
      }
    }
  }
}
