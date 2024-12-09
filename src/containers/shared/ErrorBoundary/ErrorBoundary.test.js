import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  // test spec

  it('should render children when no error occurs', () => {
    const ChildComponent = () => <div data-testid='child'>I am a child component</div>;
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should render error message when an error occurs', () => {
    const ChildComponent = () => {
      throw new ErrorBoundary('Error Occurred');
    };
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );
    // expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
    expect(screen.getByTestId('errorBoundary')).toBeInTheDocument();
    // expect(screen.getByTestId('errorBoundary')).toHaveTextContent('Try again later. If the error persists contact the Admin');
  });
});
