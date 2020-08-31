import {SceneManager} from "./SceneManager";
import OrthCube from "./sceneSubjects/OrthoCube";
import * as THREE from "three";


export class OrthoSM extends SceneManager {
  constructor(canvas) {
    super(canvas);
    this.sceneSubjects = {
      orthoCube: new OrthCube(this.scene)
    }
    this.camera = this.setUpCamera(canvas);
  }

  setUpCamera = (canvas) => {
    const camera = new THREE.OrthographicCamera(-1,1, canvas.offsetWidth/canvas.offsetHeight, -canvas.offsetWidth/canvas.offsetHeight, 0, 1000)
    camera.position.fromArray([1,1,1]);
    camera.up.fromArray([0,0,1]);
    camera.lookAt(0,0,0)
    return camera;
  };


  _traverse = (fn, ...args) => {
    Object.values(this.sceneSubjects).map(child => {
      console.log(child)
      if (typeof child[fn] === 'function') {
        child[fn].apply(child, args);
      }
    })
  }
}