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
      const {cube, geometry} = create_perspective_cube_mesh();
      const perspective_plane = setup_perspective_cube_plane();
      const {lines, planes} = create_perspective_cube_objects(cube, geometry);
      const cube_objects = [perspective_plane, cube, lines, ...planes];
      cube_objects.map(obj => {
        scene.add(obj);
      })
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
  cube.name = "cube"

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
    perspective_plane.rotation.z = -Math.PI / 2;
    perspective_plane.position.x = 0.1 / 2;
  }

  return perspective_plane;
}

const create_perspective_cube_objects = (cube, geometry) => {
  const edges = new THREE.EdgesGeometry(geometry);
  const lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
    color: 0xffffff
  }))

  const colors = [0xff0000, 0x00ff00, 0x0000ff];

  const planes_material = colors.map(color => {
    return new THREE.MeshBasicMaterial({
      color: color,
      opacity: 0.4,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: false
    })
  })

  const planes_geometry = new THREE.PlaneBufferGeometry(0.1, 0.1);

  const planes = planes_material.map(material => {
    return new THREE.Mesh(planes_geometry, material)
  })

  planes[0].rotation.y = Math.PI / 2;
  planes[0].position.x = (1.01 * 0.1) / 2;
  planes[0].name = "red plane";

  planes[1].rotation.x = -Math.PI / 2;
  planes[1].position.y = (1.01 * 0.1) / 2;
  planes[1].name = "green plane";

  planes[2].rotation.y = 0;
  planes[2].position.z = (1.01 * 0.1) / 2;
  planes[2].name = "blue plane";

  return { lines, planes }
}