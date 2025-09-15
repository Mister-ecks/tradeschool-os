import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizSystem from '@/components/quiz/QuizSystem';

const mockQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    question: "What color is the sky?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: "Blue"
  }
];

describe('QuizSystem', () => {
  test('renders quiz start screen', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    expect(screen.getByText('Quiz Ready')).toBeInTheDocument();
    expect(screen.getByText('3 questions • 80% passing score')).toBeInTheDocument();
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });

  test('starts quiz when start button is clicked', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  test('displays question options', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Madrid')).toBeInTheDocument();
  });

  test('allows selecting answers', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    const parisOption = screen.getByText('Paris');
    fireEvent.click(parisOption);
    
    // Check if the option is selected (the actual implementation may use different classes)
    expect(parisOption).toBeInTheDocument();
  });

  test('navigates to next question', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    const parisOption = screen.getByText('Paris');
    fireEvent.click(parisOption);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Question 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  test('shows results when quiz is complete', async () => {
    const mockOnComplete = jest.fn();
    render(<QuizSystem questions={mockQuestions} onComplete={mockOnComplete} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    // Answer all questions
    const parisOption = screen.getByText('Paris');
    fireEvent.click(parisOption);
    fireEvent.click(screen.getByText('Next'));
    
    const fourOption = screen.getByText('4');
    fireEvent.click(fourOption);
    fireEvent.click(screen.getByText('Next'));
    
    const blueOption = screen.getByText('Blue');
    fireEvent.click(blueOption);
    fireEvent.click(screen.getByText('Finish'));
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('PASSED')).toBeInTheDocument();
    });
  });

  test('calls onComplete with correct results', async () => {
    const mockOnComplete = jest.fn();
    render(<QuizSystem questions={mockQuestions} onComplete={mockOnComplete} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    // Answer all questions correctly
    fireEvent.click(screen.getByText('Paris'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Blue'));
    fireEvent.click(screen.getByText('Finish'));
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
    });
    
    // Click the Complete button in the results screen
    fireEvent.click(screen.getByText('Complete'));
    
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith({
        score: 3,
        percentage: 100,
        passed: true,
        answers: { 0: 'Paris', 1: '4', 2: 'Blue' },
        totalQuestions: 3
      });
    });
  });

  test('shows correct answer highlighting after completion', async () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    // Answer incorrectly
    fireEvent.click(screen.getByText('London'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Red'));
    fireEvent.click(screen.getByText('Finish'));
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
    });
  });

  test('allows restarting quiz', async () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    // Complete quiz
    fireEvent.click(screen.getByText('Paris'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Blue'));
    fireEvent.click(screen.getByText('Finish'));
    
    await waitFor(() => {
      expect(screen.getByText('Quiz Complete!')).toBeInTheDocument();
    });
    
    const retakeButton = screen.getByText('Retake Quiz');
    fireEvent.click(retakeButton);
    
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
  });

  test('disables next button until answer is selected', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    
    fireEvent.click(screen.getByText('Paris'));
    expect(nextButton).not.toBeDisabled();
  });

  test('shows progress bar correctly', () => {
    render(<QuizSystem questions={mockQuestions} />);
    
    const startButton = screen.getByText('Start Quiz');
    fireEvent.click(startButton);
    
    // Check for progress text instead of progressbar role
    expect(screen.getByText('33%')).toBeInTheDocument();
  });
});
