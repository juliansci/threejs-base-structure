import Debug from "./utils/Debug";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import * as THREE from "three";
import Resources from "./utils/Resources";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";

declare global {
  interface Window {
    app: App;
  }
}
let instance: App = null;

const sources: any[] = [
  {
    name: "sphereColorTexture",
    type: "texture",
    path: "textures/sphere/color.jpg",
  },
  {
    name: "sphereNormalTexture",
    type: "texture",
    path: "textures/sphere/normal.jpg",
  },
  {
    name: "sphereAOTexture",
    type: "texture",
    path: "textures/sphere/ao.jpg",
  },
  {
    name: "sphereDisplacementTexture",
    type: "texture",
    path: "textures/sphere/displacement.jpg",
  },
  {
    name: "floorColorTexture",
    type: "texture",
    path: "textures/floor/color.jpg",
  },
  {
    name: "floorNormalTexture",
    type: "texture",
    path: "textures/floor/normal.jpg",
  },
  {
    name: "floorAOTexture",
    type: "texture",
    path: "textures/floor/ao.jpg",
  },
  {
    name: "floorDisplacementTexture",
    type: "texture",
    path: "textures/floor/displacement.jpg",
  },
];

const variables = {
  backgroundColor: "#1c1735",
};

export default class App {
  canvas: HTMLCanvasElement;
  variables: any;
  debug: Debug;
  sizes: Sizes;
  time: Time;
  scene: THREE.Scene;
  resources: Resources;
  camera: Camera;
  renderer: Renderer;
  world: World;

  constructor(_canvas?: HTMLCanvasElement) {
    if (instance) {
      return instance;
    }

    instance = this;

    // Global access
    window.app = this;

    // Options
    this.canvas = _canvas;
    this.variables = variables;
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
    // Updates on ticks
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.isActive) this.debug.gui.destroy();
  }
}
