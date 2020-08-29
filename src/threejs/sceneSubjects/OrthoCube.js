import * as THREE from "three";

export default function OrthCube(scene) {


  this.addCube = () => {
    console.log("cube added: ", perspective_plane);
    scene.add(perspective_plane);
    scene.traverse(child => {
      console.log(child)
    })
  };

  this.update = function() {
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
  }

  this.onAppDidUpdate = (oldProps, oldState, newProps, newState) => {
    if(newState.cubeIsAdded) {
      // set up cube sides
      const {cube, geo} = create_perspective_cube_mesh();
      const perspective_plane = setup_perspective_cube_plane()
      scene.add(perspective_plane);
    }
  };

}

const create_perspective_cube_mesh = () => {
  const geometry = new THREE.BoxGeometry(.1,.1,.1);
  const material = new THREE.MeshBasicMaterial({
    color: "#555555",
    opacity: 0.1,
    transparent: true,
    side: THREE.DoubleSide,
    wireframe: false
  })
  let cube = new THREE.Mesh(geometry, material);

  cube.rotation.x = 0;
  cube.rotation.y = 0;
  cube.rotation.z = 0;

  return {cube, geometry};
}

const setup_perspective_cube_plane = () => {
  // add perspective plane
  const geometry = new THREE.PlaneGeometry(0.1, 0.1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.8,
    side: THREE.DoubleSide,
    wireframe: false
  });
  const perspective_plane = new THREE.Mesh(geometry, material);
  perspective_plane.material.color.setHex(0xffffff);

  perspective_plane.rotation.x = 0;
  perspective_plane.rotation.y = 0;
  perspective_plane.rotation.z = 0;

  perspective_plane.position.x = 0;
  perspective_plane.position.y = 0;
  perspective_plane.position.z = 0;

  const orientation = "x";

  if(orientation === "x"){
    perspective_plane.rotation.x = 0;
    perspective_plane.rotation.y = Math.PI / 2;
    perspective_plane.rotation.z = Math.PI / 2;
    perspective_plane.position.x = 0.1 / 2;
  }

  return perspective_plane;
}

const create_and add_perspective_cube_objects = cube => {
  const edges = new THREE.EdgesGeometry(cube);
  const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: 0xffffff
  }))

  const colors = ["#ff0000", "#00ff00", "#0000ff"];

  const planes_material = colors.map(color => {
    return new THREE.MeshBasicMaterial({
      color: color,
      opacity: 0.4,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false
    })
  })

  return { lines, ...planes }
}