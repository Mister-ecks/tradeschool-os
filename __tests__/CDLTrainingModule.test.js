import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CDLTrainingModule from '@/components/cdl/CDLTrainingModule';

// Mock the quiz system
jest.mock('@/components/quiz/QuizSystem', () => {
  return function MockQuizSystem({ questions, onComplete }) {
    return (
      <div data-testid="quiz-system">
        <div>Quiz with {questions.length} questions</div>
        <button onClick={() => onComplete({ score: 5, percentage: 80, passed: true })}>
          Complete Quiz
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

describe('CDLTrainingModule', () => {
  test('renders main CDL training interface', () => {
    render(<CDLTrainingModule />);
    
    expect(screen.getByText('CDL Training Program')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive CDL training covering all essential topics for commercial vehicle operation')).toBeInTheDocument();
  });

  test('displays all 5 training days', () => {
    render(<CDLTrainingModule />);
    
    expect(screen.getByText('Day 1: Introduction to Commercial Driving')).toBeInTheDocument();
    expect(screen.getByText('Day 2: Vehicle Systems and Air Brakes')).toBeInTheDocument();
    expect(screen.getByText('Day 3: Road Signs and Traffic Laws')).toBeInTheDocument();
    expect(screen.getByText('Day 4: Vehicle Operation and Safety')).toBeInTheDocument();
    expect(screen.getByText('Day 5: Final Assessment and Certification')).toBeInTheDocument();
  });

  test('shows module details for each day', () => {
    render(<CDLTrainingModule />);
    
    // Check Day 1 details with more flexible matching
    expect(screen.getAllByText('7.5 hours')[0]).toBeInTheDocument();
    expect(screen.getByText(/CDL Requirements and Regulations/)).toBeInTheDocument();
    expect(screen.getByText(/Commercial Vehicle Types and Classifications/)).toBeInTheDocument();
  });

  test('displays video information for each module', () => {
    render(<CDLTrainingModule />);
    
    expect(screen.getAllByText('Videos (3):')[0]).toBeInTheDocument();
    expect(screen.getByText(/Introduction to CDL.*45 minutes/)).toBeInTheDocument();
    expect(screen.getByText(/Vehicle Classifications.*60 minutes/)).toBeInTheDocument();
    expect(screen.getByText(/Hours of Service.*90 minutes/)).toBeInTheDocument();
  });

  test('shows start module and quiz buttons for each day', () => {
    render(<CDLTrainingModule />);
    
    const startButtons = screen.getAllByRole('button', { name: /Start Module/i });
    const quizButtons = screen.getAllByRole('button', { name: /^Quiz$/i });
    
    expect(startButtons).toHaveLength(5);
    expect(quizButtons).toHaveLength(5);
  });

  test('enters quiz mode when quiz button is clicked', async () => {
    render(<CDLTrainingModule />);
    
    const quizButtons = screen.getAllByRole('button', { name: /Quiz/i });
    fireEvent.click(quizButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('quiz-system')).toBeInTheDocument();
      expect(screen.getByText('Quiz with 3 questions')).toBeInTheDocument();
    });
  });

  test('shows yard training section', () => {
    render(<CDLTrainingModule />);
    
    expect(screen.getByText('Additional Training')).toBeInTheDocument();
    expect(screen.getByText('Yard Training Checklist')).toBeInTheDocument();
    expect(screen.getByText('Hands-on inspection training')).toBeInTheDocument();
  });

  test('enters yard training mode when clicked', () => {
    render(<CDLTrainingModule />);
    
    const yardTrainingButton = screen.getByRole('button', { name: /Yard Training Checklist/i });
    fireEvent.click(yardTrainingButton);
    
    expect(screen.getByText('Yard Training Checklist')).toBeInTheDocument();
    expect(screen.getByText('Air Brake System Inspection')).toBeInTheDocument();
    expect(screen.getByText('Cab Inspection')).toBeInTheDocument();
  });

  test('displays yard training categories', () => {
    render(<CDLTrainingModule />);
    
    const yardTrainingButton = screen.getByRole('button', { name: /Yard Training Checklist/i });
    fireEvent.click(yardTrainingButton);
    
    expect(screen.getByText('Air Brake System Inspection')).toBeInTheDocument();
    expect(screen.getByText('Cab Inspection')).toBeInTheDocument();
    expect(screen.getByText('Cargo Securement')).toBeInTheDocument();
    expect(screen.getByText('Coupling Devices')).toBeInTheDocument();
    expect(screen.getByText('Emergency Equipment')).toBeInTheDocument();
    expect(screen.getByText('Tires and Suspension')).toBeInTheDocument();
  });

  test('shows inspection items for each category', () => {
    render(<CDLTrainingModule />);
    
    const yardTrainingButton = screen.getByRole('button', { name: /Yard Training Checklist/i });
    fireEvent.click(yardTrainingButton);
    
    expect(screen.getAllByText('7 inspection items')[0]).toBeInTheDocument();
    expect(screen.getByText('Check air compressor operation')).toBeInTheDocument();
    expect(screen.getByText('Inspect air lines for leaks')).toBeInTheDocument();
  });

  test('allows navigation back from quiz mode', async () => {
    render(<CDLTrainingModule />);
    
    const quizButtons = screen.getAllByRole('button', { name: /Quiz/i });
    fireEvent.click(quizButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('quiz-system')).toBeInTheDocument();
    });
    
    const backButton = screen.getByRole('button', { name: /Back to Module/i });
    fireEvent.click(backButton);
    
    expect(screen.getByText('CDL Training Program')).toBeInTheDocument();
  });

  test('allows navigation back from yard training', () => {
    render(<CDLTrainingModule />);
    
    const yardTrainingButton = screen.getByRole('button', { name: /Yard Training Checklist/i });
    fireEvent.click(yardTrainingButton);
    
    const backButton = screen.getByRole('button', { name: /Back to Main Menu/i });
    fireEvent.click(backButton);
    
    expect(screen.getByText('CDL Training Program')).toBeInTheDocument();
  });

  test('handles quiz completion correctly', async () => {
    render(<CDLTrainingModule />);
    
    const quizButtons = screen.getAllByRole('button', { name: /Quiz/i });
    fireEvent.click(quizButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('quiz-system')).toBeInTheDocument();
    });
    
    const completeButton = screen.getByRole('button', { name: /Complete Quiz/i });
    fireEvent.click(completeButton);
    
    await waitFor(() => {
      expect(screen.getByText('CDL Training Program')).toBeInTheDocument();
    });
  });
});
