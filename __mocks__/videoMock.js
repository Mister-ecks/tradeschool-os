// Mock for video elements and events
export const mockVideoElement = {
  play: jest.fn().mockResolvedValue(undefined),
  pause: jest.fn(),
  load: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  currentTime: 0,
  duration: 100,
  paused: true,
  ended: false,
  readyState: 4,
  videoWidth: 1920,
  videoHeight: 1080,
};

// Mock HTMLVideoElement
Object.defineProperty(HTMLVideoElement.prototype, 'play', {
  writable: true,
  value: jest.fn().mockResolvedValue(undefined),
});

Object.defineProperty(HTMLVideoElement.prototype, 'pause', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(HTMLVideoElement.prototype, 'load', {
  writable: true,
  value: jest.fn(),
});
