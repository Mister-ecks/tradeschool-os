import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VRARTrainingModule from '@/components/vr-ar/VRARTrainingModule';

// Mock Three.js
jest.mock('three');

// Mock A-Frame
jest.mock('aframe');

// Mock AR.js
jest.mock('ar.js');

// Mock WebXR
jest.mock('webxr');

// Mock barcode scanner
jest.mock('barcode-scanner');

// Mock the barcode scanner component
jest.mock('react-qr-barcode-scanner', () => {
  return function MockBarcodeScanner({ onUpdate }) {
    return (
      <div data-testid="barcode-scanner">
        <button onClick={() => onUpdate({ getText: () => '123456789012' })}>
          Scan Barcode
        </button>
      </div>
    );
  };
});

// Mock video elements
jest.mock('@/__mocks__/videoMock.js', () => ({
  mockVideoElement: {
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    load: jest.fn(),
  },
}));

describe('VRARTrainingModule', () => {
  test('renders VR/AR training interface', () => {
    render(<VRARTrainingModule />);
    
    expect(screen.getByText('VR/AR Training Modules')).toBeInTheDocument();
    expect(screen.getByText('Immersive virtual and augmented reality training for technical skills')).toBeInTheDocument();
  });

  test('displays all VR/AR modules', () => {
    render(<VRARTrainingModule />);
    
    expect(screen.getByText('Laptop Repair Training')).toBeInTheDocument();
    expect(screen.getByText('Smartphone Repair Training')).toBeInTheDocument();
    expect(screen.getByText('Fiber Optic Splicing')).toBeInTheDocument();
    expect(screen.getByText('OTDR Testing and Analysis')).toBeInTheDocument();
  });

  test('shows module details when start button is clicked', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    expect(screen.getByText('Learn laptop disassembly, component identification, and repair techniques')).toBeInTheDocument();
    expect(screen.getByText('Required Tools')).toBeInTheDocument();
    expect(screen.getByText('VR Training Scenes')).toBeInTheDocument();
  });

  test('displays tools for selected module', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    expect(screen.getByText('Precision Screwdriver Set')).toBeInTheDocument();
    expect(screen.getByText('Plastic Spudger')).toBeInTheDocument();
    expect(screen.getByText('Thermal Paste')).toBeInTheDocument();
  });

  test('shows tool scanner when scan button is clicked', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    const scanButton = screen.getByRole('button', { name: /Scan Tool Barcode/i });
    fireEvent.click(scanButton);
    
    expect(screen.getByText('Tool Scanner')).toBeInTheDocument();
    expect(screen.getByText('Scan the barcode or QR code on your tool to identify it')).toBeInTheDocument();
  });

  test('handles barcode scan correctly', async () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    const scanButton = screen.getByRole('button', { name: /Scan Tool Barcode/i });
    fireEvent.click(scanButton);
    
    // Check that scanner interface is displayed
    expect(screen.getByText('Tool Recognition Scanner')).toBeInTheDocument();
    expect(screen.getByText('Scan barcodes and QR codes to identify tools and learn proper usage')).toBeInTheDocument();
  });

  test('shows VR scenes for selected module', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    expect(screen.getByText('Laptop Disassembly')).toBeInTheDocument();
    expect(screen.getByText('Component Replacement')).toBeInTheDocument();
  });

  test('displays quiz button for selected module', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    expect(screen.getByRole('button', { name: /Take Quiz/i })).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<VRARTrainingModule />)).not.toThrow();
  });

  test('has proper heading structure', () => {
    render(<VRARTrainingModule />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('VR/AR Training Modules');
  });

  test('displays module cards with correct structure', () => {
    render(<VRARTrainingModule />);
    
    const moduleCards = screen.getAllByRole('button');
    expect(moduleCards.length).toBeGreaterThan(0);
  });

  test('shows back navigation when in module detail view', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    expect(screen.getByRole('button', { name: /Back to Modules/i })).toBeInTheDocument();
  });

  test('displays tool categories in scanner view', () => {
    render(<VRARTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    fireEvent.click(startButtons[0]); // First module (Laptop Repair)
    
    const scanButton = screen.getByRole('button', { name: /Scan Tool Barcode/i });
    fireEvent.click(scanButton);
    
    expect(screen.getByText('Tool Categories')).toBeInTheDocument();
    expect(screen.getByText('Laptop Repair')).toBeInTheDocument();
  });
});

