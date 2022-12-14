import * as THREE from "three";
import { MeshToonMaterial } from "three";
import App from "../App";
import Sizes from "../utils/Sizes";

export default class Floor {
  app: App;
  sizes: Sizes;
  scene: THREE.Scene;
  geometry: THREE.PlaneGeometry;
  rowGeometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;

  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const colorMap = this.app.resources.items.floorColorTexture;
    colorMap.encoding = THREE.sRGBEncoding;
    const normal = this.app.resources.items.floorNormalTexture;

    this.material = new THREE.MeshStandardMaterial({
      map: colorMap,
      aoMap: this.app.resources.items.floorAOTexture,
      aoMapIntensity: 0.5,
      normalMap: normal,
      displacementMap: this.app.resources.items.floorDisplacementTexture,
      displacementScale: 0.1,
    });
  }

  create() {
    const mesh = new THREE.Mesh(this.geometry, this.material);
    mesh.position.set(0, 0, 0);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
}
