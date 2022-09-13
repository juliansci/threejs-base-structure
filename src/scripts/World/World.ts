import App from "../App";
import Resources from "../utils/Resources";
import Board from "./Floor";
import Environment from "./Environment";
import Sphere from "./Sphere";
import Floor from "./Floor";

export default class World {
  instance: THREE.WebGLRenderer;
  app: App;
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  resources: Resources;
  floor: Floor;
  environment: Environment;
  sphere: Sphere;

  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.resources = this.app.resources;
    this.environment = new Environment();

    this.resources.on("ready", () => {
      this.sphere = new Sphere();
      this.floor = new Floor();

      this.environment.create();
      this.floor.create();
      this.sphere.create();
    });
  }

  update() {
    this.sphere && this.sphere.update();
  }
}
