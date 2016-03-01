import THREE from '../../lib/three';
import gui from '../gui';

let box;

export function init(scene) {
  gui.settings.boxColor = new THREE.Color(1,1,1);
  gui.addThreeColor(gui.settings, 'boxColor');

  box = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshPhongMaterial({ color: gui.settings.color}));

  box.material.color.setHex(0xffffff);
  box.position.set(0, 0, 0);

  scene.add(box);
}


export function update(timestamp) {
  const value = .5 + .5 * Math.sin(timestamp / 1000);

  box.material.color.copy(gui.settings.boxColor);
  box.scale.set(1 + value, 2 - value, 1);
}
