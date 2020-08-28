import { SceneManager } from "./SceneManager";
import { OrthoSM } from "./OrthoSM";

export default containerElement => {
  console.log("threeentrypoint")
  let _running = false;
  const canvas = createCanvas(document, containerElement);
  const sceneManger = new OrthoSM(canvas);

  bindEventListeners();
  render();

  function createCanvas(document, containerElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManger.onWindowResize();
  }

  function start() {
    _running = true;
    render();
  }

  function stop() {
    _running = false;
    cancelAnimationFrame(render);
  }

  function render() {
    if (!_running) return;

    requestAnimationFrame(render);
    sceneManger.update();
  }

  return {sceneManger, start, stop};
};