import { observable, action } from "mobx";
import { createContext } from "react";
import { IAppTask } from "../models/appTask";
import agent from "../api/agent";

class AppTaskStore {
  @observable appTasks: IAppTask[] = [];

  @action loadAppTasks = () => {
    agent.AppTasks.list().then(appTasks => {
      this.appTasks = appTasks;
    });
  };

  @action updateAppTask = (appTask: IAppTask) => {
    agent.AppTasks.update(appTask);
  }

  @action markAppTask = (id: string, value: boolean) => {
    agent.AppTasks.mark(id, value);
  }
}

export default createContext(new AppTaskStore());
