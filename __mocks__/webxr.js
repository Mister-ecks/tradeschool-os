// Mock for WebXR API
export const XRSession = jest.fn(() => ({
  requestReferenceSpace: jest.fn().mockResolvedValue({
    getOffsetReferenceSpace: jest.fn(),
  }),
  requestAnimationFrame: jest.fn(),
  end: jest.fn().mockResolvedValue(undefined),
}));

export const XRReferenceSpace = jest.fn();
export const XRFrame = jest.fn(() => ({
  getPose: jest.fn(),
  getViewerPose: jest.fn(),
}));

export const XRWebGLLayer = jest.fn(() => ({
  getViewport: jest.fn(),
}));

export const XRView = jest.fn();
export const XRViewport = jest.fn();

export default {
  XRSession,
  XRReferenceSpace,
  XRFrame,
  XRWebGLLayer,
  XRView,
  XRViewport,
};
