import THREE from '../lib/three';

import * as cube from './modules/cube';

let scene, renderer, camera, controls;

export function init() {
  // ---- renderer
  renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);


  // ---- scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.00045);
  window.scene = scene; // export for three.js inspector

  // ---- camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.fromArray([0, 100, 500]);
  camera.lookAt(new THREE.Vector3(0, 160, 0));

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  scene.add(camera);


  // ---- basic lighting
  const dirLight = new THREE.DirectionalLight(0xffffff, .8);
  const ambLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .2);
  dirLight.position.set(-1, 2, 1);

  scene.add(dirLight, ambLight);


  // ---- some helpers
  scene.add(new THREE.AxisHelper(50));
  scene.add(new THREE.GridHelper(10000, 100));


  // ---- initialize modules
  cube.init(scene);


  return renderer.domElement;
}


export function setSize(width, height) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}


export function update(timestamp) {
  controls.update();

  cube.update(timestamp);
}


export function render() {
  renderer.render(scene, camera);
}
