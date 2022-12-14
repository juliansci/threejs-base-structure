import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  sources: any;
  items: any;
  toLoad: number;
  loaded: number;
  loaders: any;

  constructor(_sources: any) {
    super();

    this.sources = _sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  startLoading() {
    // Load each source
    if (!this.sources || !this.sources.length) {
      setTimeout(() => {
        this.trigger("ready");
      }, 0);
      return;
    }

    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file: string) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file: string) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file: string) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source: any, file: string) {
    this.items[source.name] = file;

    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
