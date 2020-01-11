import { observable, action, runInAction, computed } from "mobx";
import { createContext } from "react";
import { IAppTask } from "../models/appTask";
import agent from "../api/agent";
import { toast } from "react-toastify";

class AppTaskStore {
  messageErrorSubmit = "Problem submitting data";
  messageErrorRetrieve = "Problem retrieving data";

  @observable appTasksRegistry = new Map<string, IAppTask>();

  @action loadAppTasks = async () => {
    try {
      const appTasks = await agent.AppTasks.list();

      runInAction("loading tasks", () => {
        appTasks.forEach(appTask => {
          this.appTasksRegistry.set(appTask.id, appTask);
        });
      });
    } catch (error) {
      runInAction("load tasks error", () => {});
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
    try {
      await agent.AppTasks.create(appTask);

      runInAction("create task", () => {
        this.appTasksRegistry.set(appTask.id, appTask);
      });
    } catch (error) {
      runInAction("create task error", () => {});
      toast.error(this.messageErrorSubmit);
    }
  };

  @action editAppTask = async (appTask: IAppTask) => {
    try {
      await agent.AppTasks.edit(appTask);

      runInAction("editing task", () => {
        this.appTasksRegistry.set(appTask.id, appTask);
      });
    } catch (error) {
      runInAction("edit task error", () => {});
      toast.error(this.messageErrorSubmit);
    }
  };

  @action deleteAppTask = async (id: string) => {
    try {
      await agent.AppTasks.delete(id);

      runInAction("deleting task", () => {
        this.appTasksRegistry.delete(id);
      });
    } catch (error) {
      runInAction("delete task error", () => {});
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

export default createContext(new AppTaskStore());
