import "../style.css";
import App from "./App";

// Canvas
const canvas = document.querySelector("canvas#webgl");

new App(canvas as HTMLCanvasElement);
