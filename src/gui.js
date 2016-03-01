import THREE from '../lib/three';
import dat from 'dat-gui';

// a very simple global "use anywhere"-style gui.
// usage from within a module:
//
// import gui from '../gui';
//
// export function init(scene) {
//   gui.settings.someValue = 1;
//   gui.add(gui.settings, 'someValue', 0, 2).listen();
// }
//
// export function update(t) {
//   console.log(gui.settings.someValue);
// }

const gui = new dat.GUI();

gui.settings = {};

let NUM_COLORS = 0;
const colors = {};

gui.__proto__.addThreeColor = function(object, property) {
  if (!(object[property] instanceof THREE.Color)) {
    throw new Error('not a THREE.Color');
  }

  const id = `color_${NUM_COLORS++}`;
  colors[id] = {
    [property]: '#' + object[property].getHexString()
  };

  let onChangeCallback = null;
  let controller = this.addColor(colors[id], property).onChange(value => {
    object[property].setHex(parseInt(value.slice(1), 16));

    if (onChangeCallback) {
      onChangeCallback(value);
    }
  });

  controller.onChange = function(fn) { onChangeCallback = fn; }
  return controller;
};


export default gui;
