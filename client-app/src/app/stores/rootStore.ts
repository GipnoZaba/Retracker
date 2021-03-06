import AppTaskStore from "./appTaskStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProjectStore from "./projectStore";
import { IStore } from "./store";

configure({ enforceActions: "always" });

export class RootStore implements IStore {
  appTaskStore: AppTaskStore;
  projectStore: ProjectStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.appTaskStore = new AppTaskStore(this);
    this.projectStore = new ProjectStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }

  reset = () => {
    this.appTaskStore.reset();
    this.projectStore.reset();
    this.userStore.reset();
    this.commonStore.reset();
    this.modalStore.reset();
  };
}

export const RootStoreContext = createContext(new RootStore());
