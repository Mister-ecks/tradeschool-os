// Mock for Three.js library
export const Scene = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
  children: [],
}));

export const PerspectiveCamera = jest.fn(() => ({
  position: { x: 0, y: 0, z: 0 },
  lookAt: jest.fn(),
  updateProjectionMatrix: jest.fn(),
}));

export const WebGLRenderer = jest.fn(() => ({
  render: jest.fn(),
  setSize: jest.fn(),
  setClearColor: jest.fn(),
  domElement: document.createElement('canvas'),
}));

export const BoxGeometry = jest.fn();
export const MeshBasicMaterial = jest.fn();
export const Mesh = jest.fn();

export default {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
};
