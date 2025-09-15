// Mock for A-Frame VR library
export const registerComponent = jest.fn();
export const registerSystem = jest.fn();
export const registerGeometry = jest.fn();
export const registerPrimitive = jest.fn();

export const Entity = jest.fn(() => ({
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  emit: jest.fn(),
}));

export const Scene = jest.fn(() => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  emit: jest.fn(),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(),
}));

export const Camera = jest.fn();
export const Light = jest.fn();
export const Material = jest.fn();

export default {
  registerComponent,
  registerSystem,
  registerGeometry,
  registerPrimitive,
  Entity,
  Scene,
  Camera,
  Light,
  Material,
};
