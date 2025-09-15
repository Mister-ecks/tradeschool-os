// Mock for barcode/QR scanner libraries
export const scan = jest.fn(() => 
  Promise.resolve({ 
    data: "mock-qr-code-123456789012",
    format: "QR_CODE",
    timestamp: Date.now()
  })
);

export const scanFromImage = jest.fn(() => 
  Promise.resolve({ 
    data: "mock-barcode-987654321098",
    format: "CODE_128",
    timestamp: Date.now()
  })
);

export const scanFromVideo = jest.fn(() => 
  Promise.resolve({ 
    data: "mock-video-scan-112233445566",
    format: "QR_CODE",
    timestamp: Date.now()
  })
);

export const BarcodeScanner = jest.fn(() => ({
  scan,
  scanFromImage,
  scanFromVideo,
  start: jest.fn(),
  stop: jest.fn(),
  onDetected: jest.fn(),
}));

export default {
  scan,
  scanFromImage,
  scanFromVideo,
  BarcodeScanner,
};
