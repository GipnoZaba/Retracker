import { observable, action, runInAction, computed } from "mobx";
import { IAppTask } from "../models/appTask";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

export default class AppTaskStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  messageErrorSubmit = "Problem submitting data";
  messageErrorRetrieve = "Problem retrieving data";

  @observable appTasksRegistry = new Map<string, IAppTask>();
  @observable loadingInitial = false;
  @observable submitting = false;

  @action loadAppTasks = async () => {
    this.loadingInitial = true;
    try {
      const appTasks = await agent.AppTasks.list();

      runInAction("loading tasks", () => {
        appTasks.forEach(appTask => {
          this.appTasksRegistry.set(appTask.id, appTask);
        });

        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load tasks error", () => {
        this.loadingInitial = false;
      });
      toast.error(this.messageErrorRetrieve);
    }
  };

  @computed get todoTasksByOrder() {
    return this.groupAppTasksByOrder(
      Array.from(this.appTasksRegistry.values()).filter(task => !task.isDone)
    );
  }

  @computed get doneTasksByOrder() {
    return this.groupAppTasksByOrder(
      Array.from(this.appTasksRegistry.values()).filter(task => task.isDone)
    );
  }

  groupAppTasksByOrder(appTasks: IAppTask[]) {
    return appTasks.sort((a, b) => a.orderIndex - b.orderIndex);
  }

  @action createAppTask = async (appTask: IAppTask) => {
    this.submitting = true;
    try {
      await agent.AppTasks.create(appTask);

      runInAction("create task", () => {
        this.appTasksRegistry.set(appTask.id, appTask);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create task error", () => {
        this.submitting = false;
      });
      toast.error(this.messageErrorSubmit);
    }
  };

  @action editAppTask = async (appTask: IAppTask) => {
    this.submitting = true;
    try {
      await agent.AppTasks.edit(appTask);

      runInAction("editing task", () => {
        this.appTasksRegistry.set(appTask.id, appTask);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit task error", () => {
        this.submitting = false;
      });
      toast.error(this.messageErrorSubmit);
    }
  };

  @action deleteAppTask = async (id: string) => {
    this.submitting = true;
    try {
      await agent.AppTasks.delete(id);

      runInAction("deleting task", () => {
        this.appTasksRegistry.delete(id);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("delete task error", () => {
        this.submitting = false;
      });
      toast.error(this.messageErrorSubmit);
    }
  };

  getTodoLength() {
    return Array.from(this.appTasksRegistry.values()).filter(
      task => !task.isDone
    ).length;
  }

  getDoneLength() {
    return Array.from(this.appTasksRegistry.values()).filter(
      task => task.isDone
    ).length;
  }
}
