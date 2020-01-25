import AppTaskStore from "./appTaskStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

configure({ enforceActions: "always" });

export class RootStore {
  activityStore: AppTaskStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.activityStore = new AppTaskStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }

  reset = () => {
    this.activityStore.reset();
    this.userStore.reset();
    this.commonStore.reset();
    this.modalStore.reset();
  }
}

export const RootStoreContext = createContext(new RootStore());
