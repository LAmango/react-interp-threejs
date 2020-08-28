import * as THREE from "three";

export default function OrthCube(scene) {
  // add perspective plane
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.8,
    side: THREE.DoubleSide,
    wireframe: true
  });
  const perspective_plane = new THREE.Mesh(geometry, material);

  this.addCube = () => {
    console.log("cube added: ", perspective_plane);
    scene.add(perspective_plane);
  };

  this.update = function() {
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
  }
}