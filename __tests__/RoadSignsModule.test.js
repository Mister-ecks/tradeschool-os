import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoadSignsModule from '@/components/modules/road-signs/RoadSignModule';

describe('RoadSignsModule', () => {
  test('renders road signs training interface', () => {
    render(<RoadSignsModule />);
    
    expect(screen.getByText('Road Signs Training')).toBeInTheDocument();
    expect(screen.getByText('Master Ontario road signs for safe driving')).toBeInTheDocument();
  });

  test('displays study mode button', () => {
    render(<RoadSignsModule />);
    
    expect(screen.getByText('Study Mode')).toBeInTheDocument();
  });

  test('displays quiz mode button', () => {
    render(<RoadSignsModule />);
    
    expect(screen.getByText('Quiz Mode')).toBeInTheDocument();
  });

  test('shows sign categories section', () => {
    render(<RoadSignsModule />);
    
    expect(screen.getByText('Sign Categories')).toBeInTheDocument();
  });

  test('displays regulatory signs category', () => {
    render(<RoadSignsModule />);
    
    // Look for the text that includes "Regulatory Signs" with count
    expect(screen.getByText(/Regulatory Signs/)).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    expect(() => render(<RoadSignsModule />)).not.toThrow();
  });

  test('has proper heading structure', () => {
    render(<RoadSignsModule />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Road Signs Training');
  });

  test('displays mode selection buttons', () => {
    render(<RoadSignsModule />);
    
    const studyButton = screen.getByRole('button', { name: /Study Mode/i });
    const quizButton = screen.getByRole('button', { name: /Quiz Mode/i });
    
    expect(studyButton).toBeInTheDocument();
    expect(quizButton).toBeInTheDocument();
  });

  test('shows proper layout structure', () => {
    render(<RoadSignsModule />);
    
    // Check for main container classes - look for the outermost container
    const mainContainer = screen.getByText('Road Signs Training').closest('.min-h-screen');
    expect(mainContainer).toBeInTheDocument();
  });
});
