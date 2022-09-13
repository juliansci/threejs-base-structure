import App from "./App";

// Canvas
const canvas = document.querySelector("canvas#webgl");

new App(canvas as HTMLCanvasElement);

// const createSphere = (position) => {

// };

// const createCross = (position) => {
//   const material = new THREE.MeshStandardMaterial({
//     color: "#00FF00",
//   });
//   const geometry = new THREE.BoxGeometry(1.6, 0.15, 0.15);
//   const firstLine = new THREE.Mesh(geometry, material);
//   const secondLine = new THREE.Mesh(geometry, material);
//   firstLine.rotation.z = -Math.PI / 4;
//   secondLine.rotation.z = Math.PI / 4;
//   scene.add(firstLine);
//   scene.add(secondLine);
// };

// const createPlaneSection = (position = { x: 0, y: 0 }) => {
//   const material = new THREE.MeshStandardMaterial({
//     color: "#FFFF00",
//     side: THREE.DoubleSide,
//   });
//   material.transparent = true;
//   material.opacity = 0;
//   material.needsUpdate = true;
//   const geometry = new THREE.PlaneGeometry(2, 2);
//   const plane = new THREE.Mesh(geometry, material);
//   plane.position.set(position.x, position.y, 0);
//   scene.add(plane);
//   return plane;
// };

// const sections = [];
// const createPlaneSections = () => {
//   const section0 = createPlaneSection({ x: -2.2, y: 2.2 });
//   const section1 = createPlaneSection({ x: 0, y: 2.2 });
//   const section2 = createPlaneSection({ x: 2.2, y: 2.2 });
//   const section3 = createPlaneSection({ x: -2.2, y: 0 });
//   const section4 = createPlaneSection({ x: 0, y: 0 });
//   const section5 = createPlaneSection({ x: 2.2, y: 0 });
//   const section6 = createPlaneSection({ x: -2.2, y: -2.2 });
//   const section7 = createPlaneSection({ x: 0, y: -2.2 });
//   const section8 = createPlaneSection({ x: 2.2, y: -2.2 });
//   sections.push(
//     section0,
//     section1,
//     section2,
//     section3,
//     section4,
//     section5,
//     section6,
//     section7,
//     section8
//   );
// };

// //createBoard();
// //createSphere();
// //createCross();
// createPlaneSections();

// const raycaster = new THREE.Raycaster();
// const pointer = new THREE.Vector2(-1, -1);
// const click = new THREE.Vector2(-1, -1);
// function onPointerMove(event) {
//   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }
// window.addEventListener("pointermove", onPointerMove);
// window.addEventListener("pointerdown", (event) => {
//   click.x = (event.clientX / window.innerWidth) * 2 - 1;
//   click.y = -(event.clientY / window.innerHeight) * 2 + 1;
//   createSphere();
// });

// const tick = () => {

//   raycaster.setFromCamera(pointer, camera);
//   const intersects = raycaster.intersectObjects(scene.children);
//   for (const section of sections) {
//     gsap.to(section.material, {
//       duration: 0.2,
//       opacity: 0,
//     });
//   }
//   for (let i = 0; i < intersects.length; i++) {
//     const currentNode = intersects[i].object;
//     const object = sections.find((node) => node === currentNode);

//     if (object) {
//       gsap.to(object.material, {
//         duration: 0.2,
//         opacity: 0.5,
//       });
//     }
//   }

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };
