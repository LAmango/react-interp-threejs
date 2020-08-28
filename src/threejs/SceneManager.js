import * as THREE from "three";

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height
    };

    this.clock = new THREE.Clock();

    // set up scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#c4c4c4");

    // set up renderer
    this.renderer = new THREE.WebGL1Renderer({canvas: this.canvas, antialias: true, alpha: true});
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    this.renderer.setPixelRatio(DPR);
    this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);

    // set up camera
    const aspectRatio = this.canvas.width / this.canvas.height;
    const fov = 60;
    const nearPlane = 1;
    const farPlane = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
    this.camera.position.z = 5;
  }

  update = () => {
    const elapsedTime = this.clock.getElapsedTime();

    for (let i = 0; i < this.sceneSubjects.length; i++) {
      //this.sceneSubjects[i].update(elapsedTime);
    }

    this.renderer.render(this.scene, this.camera);
  };

  onWindowResize = () => {
    const {width, height} = this.canvas;

    this.screenDimensions.width = width;
    this.screenDimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };

  onAppDidUpdate = (oldProps, oldState, newProps, newState) => {
    this._traverse("onAppDidUpdate", oldProps, oldState, newProps, newState);
  };

  /**
   * Must be implemented by child classes
   *
   * @param fn
   * @param args
   * @private
   */
  _traverse = (fn, ...args) => {
  };
}