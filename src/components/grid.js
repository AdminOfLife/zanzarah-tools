import AFRAME, { THREE } from 'aframe/src';

AFRAME.registerComponent('grid', {
  init() {
    this.el.setObject3D('grid', new THREE.GridHelper(15, 30, 0xBBBBBB, 0x888888));
  },
});
