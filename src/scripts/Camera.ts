import * as THREE from "three";
import App from "./App";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import Sizes from "./utils/Sizes";

export default class Camera {
  instance: THREE.PerspectiveCamera;
  app: App;
  canvas: HTMLCanvasElement;
  sizes: Sizes;
  scene: THREE.Scene;
  controls: OrbitControls;

  constructor() {
    this.app = new App();

    this.sizes = this.app.sizes;
    this.scene = this.app.scene;
    this.canvas = this.app.canvas;

    this.setInstance();
    this.setControls();
    //this.runInitialAnimation();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 10, 10);
    this.scene.add(this.instance);
  }

  runInitialAnimation() {
    gsap.to(this.instance.position, {
      duration: 1,
      z: 0,
    });
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05;
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
