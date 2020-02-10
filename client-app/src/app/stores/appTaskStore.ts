import { observable, action, runInAction, computed } from "mobx";
import { IAppTask, IAppTaskFormValues } from "../models/appTask";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import {
  messageErrorRetrieve,
  messageErrorSubmit,
  isOverdue
} from "../common/utils/utilities";
import { IStore } from "./store";
import { compareAsc, isToday } from "date-fns";

export default class AppTaskStore implements IStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.appTasksRegistry.clear();
    this.loadingInitial = false;
    this.submitting = false;

    this.updateStorage();
  }

  appTasksRegistryKey = "appTasksRegistryKey";

  @observable appTasksRegistry = new Map<string, IAppTask>();
  @observable loadingInitial = false;
  @observable submitting = false;

  @action loadAppTasks = async () => {
    this.loadingInitial = true;

    if (window.localStorage.getItem(this.appTasksRegistryKey) !== null) {
      this.setAppTasksRegistryFromJson();
      return;
    }

    try {
      const appTasks = await agent.AppTasks.list();

      runInAction("loading tasks", () => {
        appTasks.forEach(appTask => {
          this.appTasksRegistry.set(appTask.id, appTask);
        });

        this.updateStorage();

        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load tasks error", () => {
        this.loadingInitial = false;
      });
      toast.error(messageErrorRetrieve);
    }
  };

  @computed get appTasksByDate() {
    return this.groupAppTasksByDate(
      Array.from(this.appTasksRegistry.values()).filter(
        appTask => !appTask.isDone && !isOverdue(new Date(appTask.deadline))
      )
    );
  }

  @computed get doneTasks() {
    return Array.from(this.appTasksRegistry.values()).filter(
      appTask => appTask.isDone
    );
  }

  @computed get overdueTasks() {
    return Array.from(this.appTasksRegistry.values()).filter(
      appTask => !appTask.isDone && isOverdue(new Date(appTask.deadline))
    );
  }

  groupAppTasksByDate(appTasks: IAppTask[]) {
    const sortedAppTasks = appTasks.sort((a, b) =>
      compareAsc(new Date(a.deadline), new Date(b.deadline))
    );

    return Object.entries(
      sortedAppTasks.reduce((tasks, appTask) => {
        const deadline = new Date(appTask.deadline);

        const group = isToday(deadline)
          ? "Today"
          : deadline.toISOString().split("T")[0];

        tasks[group] = tasks[group] ? [...tasks[group], appTask] : [appTask];
        return tasks;
      }, {} as { [key: string]: IAppTask[] })
    );
  }

  @action createAppTask = async (formValues: IAppTaskFormValues) => {
    this.submitting = true;
    try {
      formValues.dateCreated = formValues.dateCreated ?? new Date();
      formValues.deadline = formValues.deadline ?? new Date();
      await agent.AppTasks.create(formValues);

      runInAction("create task", () => {
        if (formValues.title) {
          var appTask: IAppTask = {
            id: formValues.id,
            title: formValues.title,
            orderIndex: this.appTasksRegistry.values.length,
            description: "",
            deadline: formValues.deadline ?? new Date(),
            dateCreated: formValues.dateCreated ?? new Date(),
            isDone: false
          };
          this.appTasksRegistry.set(appTask.id, appTask);
        }

        this.updateStorage();

        this.submitting = false;
      });
    } catch (error) {
      runInAction("create task error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  @action editAppTask = async (formValues: IAppTaskFormValues) => {
    this.submitting = true;
    try {
      await agent.AppTasks.edit(formValues);

      runInAction("editing task", () => {
        var appTask = this.appTasksRegistry.get(formValues.id);
        if (appTask) {
          appTask.title = formValues.title ?? appTask.title;
          appTask.description = formValues.description ?? appTask.description;
          this.appTasksRegistry.set(formValues.id, appTask);
        }

        this.updateStorage();

        this.rootStore.modalStore.closeModal();
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit task error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
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

        this.updateStorage();

        this.submitting = false;
      });
    } catch (error) {
      runInAction("comlete task error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
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

        this.updateStorage();

        this.submitting = false;
      });
    } catch (error) {
      runInAction("restore task error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  @action deleteAppTask = async (id: string) => {
    this.submitting = true;
    try {
      await agent.AppTasks.delete(id);

      runInAction("deleting task", () => {
        this.appTasksRegistry.delete(id);

        this.updateStorage();

        this.submitting = false;
      });
    } catch (error) {
      runInAction("delete task error", () => {
        this.submitting = false;
      });
      toast.error(messageErrorSubmit);
    }
  };

  updateStorage() {
    if (this.appTasksRegistry.size > 0) {
      window.localStorage.setItem(
        this.appTasksRegistryKey,
        JSON.stringify(this.appTasksRegistry)
      );
    } else {
      window.localStorage.removeItem(this.appTasksRegistryKey);
    }
  }

  setAppTasksRegistryFromJson() {
    let json = window.localStorage.getItem(this.appTasksRegistryKey);
    if (json) {
      this.appTasksRegistry.clear();
      let mapObject = JSON.parse(json);
      Object.keys(mapObject).forEach(key => {
        this.appTasksRegistry.set(key, mapObject[key]);
      });
    }
    this.loadingInitial = false;
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
