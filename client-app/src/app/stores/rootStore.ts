import AppTaskStore from "./appTaskStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure, reaction, observable } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProjectStore from "./projectStore";
import { IStore } from "./store";

configure({ enforceActions: "always" });

export class RootStore implements IStore {
  activityStore: AppTaskStore;
  projectStore: ProjectStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.activityStore = new AppTaskStore(this);
    this.projectStore = new ProjectStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }

  reset = () => {
    this.activityStore.reset();
    this.projectStore.reset();
    this.userStore.reset();
    this.commonStore.reset();
    this.modalStore.reset();
  };
}

export const RootStoreContext = createContext(new RootStore());
