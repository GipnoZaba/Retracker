import { RootStore } from "./rootStore";
import { observable, action } from "mobx";
import { IStore } from "./store";

export default class ModalStore implements IStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.modal = { open: false, body: null };
  }

  @observable.shallow modal = {
    open: false,
    body: null
  };

  @action openModal = (content: any) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
