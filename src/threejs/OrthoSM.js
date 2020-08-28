import {SceneManager} from "./SceneManager";
import OrthCube from "./sceneSubjects/OrthoCube";


export class OrthoSM extends SceneManager {
  constructor(canvas) {
    super(canvas);
    this.sceneSubjects = {
      orthoCube: new OrthCube(this.scene)
    }
  }

  _traverse = (fn, ...args) => {
    Object.values(this.sceneSubjects).map(child => {
      console.log(child)
      if (typeof child[fn] === 'function') {
        child[fn].apply(child, args);
      }
    })
  }
}