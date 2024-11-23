import { render, screen } from '@testing-library/react';
import { ProgressTracker } from '@/components/assessment/ProgressTracker';

describe('ProgressTracker', () => {
  const defaultProps = {
    currentQuestion: 0,
    totalQuestions: 10,
    section: 'disc'
  };

  it('renders progress information correctly', () => {
    render(<ProgressTracker {...defaultProps} />);
    
    expect(screen.getByText('1 of 10')).toBeInTheDocument();
    expect(screen.getByText('disc')).toBeInTheDocument();
  });

  it('calculates progress percentage correctly', () => {
    const props = { ...defaultProps, currentQuestion: 5 };
    render(<ProgressTracker {...props} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });
});