// Mock for AR.js library
export const AR = jest.fn(() => ({
  init: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  onDetected: jest.fn(),
  onLost: jest.fn(),
}));

export const ARMarker = jest.fn(() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  emit: jest.fn(),
}));

export const ARCamera = jest.fn(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  getVideoElement: jest.fn(() => document.createElement('video')),
}));

export const ARScene = jest.fn(() => ({
  add: jest.fn(),
  remove: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

export default {
  AR,
  ARMarker,
  ARCamera,
  ARScene,
};
