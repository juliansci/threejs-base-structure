import * as THREE from "three";
import App from "../App";
import Animation from "../utils/Animation";

export default class Sphere {
  app: App;
  scene: THREE.Scene;
  geometry: THREE.SphereGeometry;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;
  animation: Animation;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.animation = new Animation();
    this.setGeometry();
    this.setMaterial();
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(1, 64, 32);
  }
  setMaterial() {
    const colorMap = this.app.resources.items.sphereColorTexture;
    colorMap.encoding = THREE.sRGBEncoding;

    this.material = new THREE.MeshStandardMaterial({
      map: colorMap,
      aoMap: this.app.resources.items.sphereAOTexture,
      aoMapIntensity: 1,
      roughness: 0.2,
      //displacementMap: this.app.resources.items.sphereDisplacementTexture,
      // displacementScale: 0.1,
      // displacementBias: 0.1,
    });
  }

  create(position?: THREE.Vector3) {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 1.01, 0);
    this.mesh.castShadow = true;

    position && this.mesh.position.set(position.x, position.y, position.z);
    this.scene.add(this.mesh);
  }

  update() {
    if (this.mesh) {
      this.mesh.rotation.y += this.animation.linearAnimation(Math.PI * 2, 5);
      // 2 => +1 sin and +1 radius
      this.mesh.position.y = this.animation.sinusAnimation(3) + 2;
    }
  }
}
