import { observable, action, runInAction, computed } from "mobx";
import { IAppTask, IAppTaskFormValues } from "../models/appTask";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

export default class AppTaskStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.appTasksRegistry.clear();
    this.loadingInitial = false;
    this.submitting = false;
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

  @action createAppTask = async (formValues: IAppTaskFormValues) => {
    this.submitting = true;
    try {
      await agent.AppTasks.create(formValues);

      runInAction("create task", () => {
        if (formValues.title) {
          var appTask: IAppTask = {
            id: formValues.id,
            title: formValues.title,
            orderIndex: this.appTasksRegistry.values.length,
            description: "",
            isDone: false
          };
          this.appTasksRegistry.set(appTask.id, appTask);
        }

        this.submitting = false;
      });
    } catch (error) {
      runInAction("create task error", () => {
        this.submitting = false;
      });
      toast.error(this.messageErrorSubmit);
    }
  };

  @action editAppTask = async (formValues: IAppTaskFormValues) => {
    this.submitting = true;
    try {
      if (this.isTaskChanged(formValues) == false) {
        this.submitting = false;
        this.rootStore.modalStore.closeModal();
        return;
      }

      await agent.AppTasks.edit(formValues);

      runInAction("editing task", () => {
        var appTask = this.appTasksRegistry.get(formValues.id);
        if (appTask) {
          appTask.title = formValues.title ?? appTask.title;
          appTask.description = formValues.description ?? appTask.description;
          this.appTasksRegistry.set(formValues.id, appTask);
        }
        this.rootStore.modalStore.closeModal();
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit task error", () => {
        this.submitting = false;
      });
      toast.error(this.messageErrorSubmit);
    }
  };

  @action completeAppTask = async (id: string) => {
    this.submitting = true;
    try {
      await agent.AppTasks.complete(id);

      runInAction("completing task", () => {
        var appTask: IAppTask | undefined = this.appTasksRegistry.get(id);
        if (appTask) {
          appTask.isDone = true;
          this.appTasksRegistry.set(id, appTask);
        }
        this.submitting = false;
      });
    } catch (error) {
      runInAction("comlete task error", () => {
        this.submitting = false;
      });
      toast.error(this.messageErrorSubmit);
    }
  };

  @action restoreAppTask = async (id: string) => {
    this.submitting = true;
    try {
      await agent.AppTasks.restore(id);

      runInAction("restoring task", () => {
        var appTask: IAppTask | undefined = this.appTasksRegistry.get(id);
        if (appTask) {
          appTask.isDone = false;
          this.appTasksRegistry.set(id, appTask);
        }
        this.submitting = false;
      });
    } catch (error) {
      runInAction("restore task error", () => {
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

  isTaskChanged(formValues: IAppTaskFormValues) {
    var appTask = this.appTasksRegistry.get(formValues.id);

    if (
      formValues.title !== appTask?.title &&
      formValues.description !== appTask?.description
    )
      return false;

    return true;
  }

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
