import { observable, action, runInAction, computed } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { IProject } from "../models/project";
import { messageErrorRetrieve } from "../common/utils/utilities";

export default class ProjectStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.appProjectsRegistry.clear();
    this.loadingInitial = false;
    this.submitting = false;
  }

  @observable appProjectsRegistry = new Map<string, IProject>();
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

  @computed get projectsByOrder() {
    return this.groupProjects(Array.from(this.appProjectsRegistry.values()));
  }

  groupProjects(projects: IProject[]) {
    return projects.sort(
      (a, b) => a.dateCreated.getDay() - b.dateCreated.getDay()
    );
  }
}
