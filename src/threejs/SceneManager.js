import * as THREE from "three";
import OrthoCube from "./sceneSubjects/OrthoCube";

export function SceneManager(canvas) {

  const clock = new THREE.Clock();

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  };

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  camera.position.z = 5;
  this.sceneSubjects = createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#c4c4c4");

    return scene;
  }

  function buildRender({width, height}) {
    const renderer = new THREE.WebGL1Renderer({canvas: canvas, antialias: true, alpha: true});
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    return renderer;
  }

  function buildCamera({width, height}) {
    const aspectRatio = width/height;
    const fov = 60;
    const nearPlane = 1;
    const farPlane = 100;

    return new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
  }

  function createSceneSubjects() {
    const sceneSubjects = {
      orthoCube: new OrthoCube(scene)
    };

    return sceneSubjects;
  }

  this.update = () => {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i<this.sceneSubjects.length; i++) {
      //this.sceneSubjects[i].update(elapsedTime);
    }

    renderer.render(scene, camera);
  };

  this.onWindowResize = () => {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };
}