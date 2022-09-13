import * as THREE from "three";
import App from "../App";
import Debug from "../utils/Debug";
import Resources from "../utils/Resources";
import * as dat from "lil-gui";

export default class Environment {
  app: App;
  scene: THREE.Scene;
  resources: Resources;
  debug: Debug;
  debugFolder: dat.GUI;
  sunLight: THREE.DirectionalLight;

  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.resources = this.app.resources;
    this.debug = this.app.debug;
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);

    // Debug
    if (this.debug.isActive) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setAmbientLight() {
    const ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(ambientLight);
    // Debug
    if (this.debug.isActive) {
      this.debugFolder
        .addColor(this.app.variables, "backgroundColor")
        .onChange((color: string) => {
          this.app.renderer.instance.setClearColor(color);
        });
    }
  }

  create() {
    if (this.debug.isActive) {
      this.debugFolder = this.debug.gui.addFolder("environment");
    }

    this.setAmbientLight();
    this.setSunLight();
  }
}
