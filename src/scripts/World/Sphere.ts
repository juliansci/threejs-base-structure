import * as THREE from "three";
import App from "../App";

export default class Sphere {
  app: App;
  scene: THREE.Scene;
  geometry: THREE.SphereGeometry;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

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
      const secs = 3600 * 10;
      this.mesh.rotation.y += (this.app.time.delta * Math.PI) / secs;
      this.mesh.position.y = Math.sin(this.app.time.elapsed * 0.004) + 2;
    }
  }
}
