import TWEEN from 'tween.js';
import Stats from 'stats.js';
import * as scene from './scene';



const stats = initStats();
const domElement = scene.init();

document.body.appendChild(domElement);

requestAnimationFrame(function __loop(timestamp) {
  requestAnimationFrame(__loop);

  stats.begin();
  TWEEN.update();
  scene.update(timestamp);
  scene.render();
  stats.end();
});

window.addEventListener('resize', () => {
  scene.setSize(window.innerWidth, window.innerHeight);
});



function initStats() {
  const stats = new Stats();

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  return stats;
}
