import * as dat from "lil-gui";

export default class Debug {
  isActive: boolean;
  gui: dat.GUI;

  constructor() {
    this.isActive = window.location.hash === "#debug";

    if (this.isActive) {
      this.gui = new dat.GUI();
    }
  }
}
