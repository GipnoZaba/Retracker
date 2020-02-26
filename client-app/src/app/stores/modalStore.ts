import { RootStore } from "./rootStore";
import { observable, action } from "mobx";
import { IStore } from "./store";

interface ISize {
    size: "mini" | "small" | "tiny" | "large" | "fullscreen"
}

export default class ModalStore implements IStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  reset() {
    this.modal = { open: false, body: null, size: "mini" };
  }

  @observable.shallow modal = {
    open: false,
    body: null,
    size: "mini"
  };

  @action openModal = (content: any, size?: string) => {
    this.modal.open = true;
    this.modal.body = content;

    if (size) this.modal.size = size;
  };

  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.size = "mini";
  };
}
