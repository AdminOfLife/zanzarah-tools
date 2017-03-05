import AFRAME from 'aframe/src';

import { bind } from '../utils/components';
import { CommonPaths } from '../utils/paths';

AFRAME.registerComponent('z-model', {
  dependencies: ['z-entity'],
  schema: {
    id: { type: 'string' },
    position: { type: 'array' },
    rotation: { type: 'array' },
    scale: { type: 'array' },
    fileName: { type: 'string' },
    _unknownColor: { type: 'number' },
    _unknownFlag1: { type: 'number' },
    _unknownFlag2: { type: 'number' },
    _unknownInt: { type: 'number' },
  },

  init() {
    this.unbind = bind(
      this, 'handleModelLoaded',
      this.el, 'model-loaded'
    );
    const { object3D } = this.el;
    const { fileName, position, rotation, scale } = this.data;
    object3D.position.fromArray(position);
    object3D.rotation.y = Math.atan2(rotation[0], rotation[2]);
    object3D.scale.fromArray(scale);
    this.el.setAttribute('dff-model', {
      dff: `${CommonPaths.StaticModels}/${fileName.toUpperCase()}.DFF`,
    });
  },
  remove() {
    this.el.removeAttribute('dff-model');
    this.unbind();
  },

  handleModelLoaded() {
    const { components } = this.el;
    components['z-entity'].toggleMarker(false);
  },
});
