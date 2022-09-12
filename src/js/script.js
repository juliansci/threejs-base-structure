import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import App from "./App.js";

// Canvas
const canvas = document.querySelector("canvas#webgl");

const app = new App(canvas);

// Debug
const debugObject = {
  backgroundColor: "#1c1735",
};

if (app.debug && app.debug.isActive) {
  app.debug.gui.addColor(debugObject, "backgroundColor").onChange((color) => {
    renderer.setClearColor(color);
  });
}

// Scene
const scene = new THREE.Scene();

// Grid Game
const createBoard = () => {
  const gridMaterial = new THREE.MeshStandardMaterial({
    color: "#ff7034",
  });
  const columnGeometry = new THREE.BoxGeometry(0.2, 6.4, 0.2);
  const rowGeometry = new THREE.BoxGeometry(6.4, 0.2, 0.2);

  const firstColumn = new THREE.Mesh(columnGeometry, gridMaterial);
  firstColumn.position.set(-1.1, 0, 0);
  const secondColumn = new THREE.Mesh(columnGeometry, gridMaterial);
  secondColumn.position.set(1.1, 0, 0);
  const firstRow = new THREE.Mesh(rowGeometry, gridMaterial);
  firstRow.position.set(0, 1.1, 0);
  const secondRow = new THREE.Mesh(rowGeometry, gridMaterial);
  secondRow.position.set(0, -1.1, 0);
  scene.add(firstColumn);
  scene.add(secondColumn);
  scene.add(firstRow);
  scene.add(secondRow);
};

const createSphere = (position) => {
  const geometry = new THREE.SphereGeometry(0.8, 64, 32);
  const material = new THREE.MeshBasicMaterial({ color: "#0000FF" });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
};

const createCross = (position) => {
  const material = new THREE.MeshStandardMaterial({
    color: "#00FF00",
  });
  const geometry = new THREE.BoxGeometry(1.6, 0.15, 0.15);
  const firstLine = new THREE.Mesh(geometry, material);
  const secondLine = new THREE.Mesh(geometry, material);
  firstLine.rotation.z = -Math.PI / 4;
  secondLine.rotation.z = Math.PI / 4;
  scene.add(firstLine);
  scene.add(secondLine);
};

const createPlaneSection = (position = { x: 0, y: 0 }) => {
  const material = new THREE.MeshStandardMaterial({
    color: "#FFFF00",
    side: THREE.DoubleSide,
  });
  material.transparent = true;
  material.opacity = 0;
  material.needsUpdate = true;
  const geometry = new THREE.PlaneGeometry(2, 2);
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(position.x, position.y, 0);
  scene.add(plane);
  return plane;
};

const sections = [];
const createPlaneSections = () => {
  const section0 = createPlaneSection({ x: -2.2, y: 2.2 });
  const section1 = createPlaneSection({ x: 0, y: 2.2 });
  const section2 = createPlaneSection({ x: 2.2, y: 2.2 });
  const section3 = createPlaneSection({ x: -2.2, y: 0 });
  const section4 = createPlaneSection({ x: 0, y: 0 });
  const section5 = createPlaneSection({ x: 2.2, y: 0 });
  const section6 = createPlaneSection({ x: -2.2, y: -2.2 });
  const section7 = createPlaneSection({ x: 0, y: -2.2 });
  const section8 = createPlaneSection({ x: 2.2, y: -2.2 });
  sections.push(
    section0,
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    section7,
    section8
  );
};

createBoard();
//createSphere();
//createCross();
createPlaneSections();

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-1, -1);
const click = new THREE.Vector2(-1, -1);
function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("pointerdown", (event) => {
  click.x = (event.clientX / window.innerWidth) * 2 - 1;
  click.y = -(event.clientY / window.innerHeight) * 2 + 1;
  createSphere();
});

const ambientLight = new THREE.AmbientLight("#ffffff", 1);
scene.add(ambientLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 25);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(debugObject.backgroundColor);
/**
 * Animate
 */
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (const section of sections) {
    gsap.to(section.material, {
      duration: 0.2,
      opacity: 0,
    });
  }
  for (let i = 0; i < intersects.length; i++) {
    const currentNode = intersects[i].object;
    const object = sections.find((node) => node === currentNode);

    if (object) {
      gsap.to(object.material, {
        duration: 0.2,
        opacity: 0.5,
      });
    }
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

gsap.to(camera.position, {
  duration: 1,
  z: 10,
});
tick();
