import { observable, action, runInAction, computed } from "mobx";
import { createContext } from "react";
import { IAppTask } from "../models/appTask";
import agent from "../api/agent";
import { toast } from "react-toastify";

class AppTaskStore {
  messageErrorSubmit = "Problem submitting data";
  messageErrorRetrieve = "Problem retrieving data";

  @observable appTasksRegistry = new Map<string, IAppTask>();
  @observable hoveredItemId: string = "";

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

  @computed get tasksByOrder() {
    return this.groupAppTasksByOrder(
      Array.from(this.appTasksRegistry.values())
    );
  }

  groupAppTasksByOrder(appTasks: IAppTask[]) {
    return appTasks;
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

  @action completeAppTask = async (id: string) => {
    try {
      await agent.AppTasks.mark(id, true);

      runInAction("completing task", () => {
        const appTask = this.appTasksRegistry.get(id);
        if (appTask !== undefined) {
          appTask.isDone = true;
          this.appTasksRegistry.set(id, appTask);
        }

        this.hoveredItemId = "";
      });
    } catch (error) {
      runInAction("complete task error", () => {});
      toast.error(this.messageErrorSubmit);
    }
  };

  @action recoverAppTask = async (id: string) => {
    try {
      await agent.AppTasks.mark(id, false);

      runInAction("recovering task", () => {
        const appTask = this.appTasksRegistry.get(id);
        if (appTask !== undefined) {
          appTask.isDone = false;
          this.appTasksRegistry.set(id, appTask);
        }

        this.hoveredItemId = "";
      });
    } catch (error) {
      runInAction("recover task error", () => {});
      toast.error(this.messageErrorSubmit);
    }
  };

  @action handleMouseEnterItem = (id: string) => {
    this.hoveredItemId = id;
  };

  @action handleMouseExitItem = () => {
    this.hoveredItemId = "";
  };
}

export default createContext(new AppTaskStore());
