import Debug from "./utils/Debug.js";
import Sizes from "./utils/Sizes.js";
import Time from "./utils/Time.js";
import * as THREE from "three";
import Resources from "./utils/Resources.js";
import Camera from "./Camera.js";

let instance = null;

const sources = [];

export default class App {
  constructor(_canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    // Global access
    window.app = this;

    // Options
    this.canvas = _canvas;
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    // CONTINUE
  }
}
