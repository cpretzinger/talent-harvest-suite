import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionDisplay } from '@/components/assessment/QuestionDisplay';

describe('QuestionDisplay', () => {
  const mockQuestion = {
    id: '1',
    text: 'Test question?',
    type: 'multiple_choice',
    options: ['Option 1', 'Option 2', 'Option 3'],
    category: 'test',
    assessment_id: '123',
    weight: 1,
    created_at: new Date().toISOString()
  };

  const mockOnAnswer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders multiple choice question correctly', () => {
    render(<QuestionDisplay question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    expect(screen.getByText(mockQuestion.text)).toBeInTheDocument();
    mockQuestion.options?.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onAnswer when an option is selected', async () => {
    render(<QuestionDisplay question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    await userEvent.click(screen.getByText('Option 1'));
    expect(mockOnAnswer).toHaveBeenCalledWith('Option 1');
  });
});