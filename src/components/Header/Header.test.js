import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByText(/ReadyRefresh is ensuring consistent delivery/i)).toBeInTheDocument();
  });

  test('toggle button to have class', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByTestId('toggleBtn')).toHaveClass('fs-4 border-0 bg-transparent');
  });

  test('toggle function to be called', () => {
    const setToggle = jest.fn();
    render(
      <BrowserRouter>
        <Header toggleBtn={setToggle()} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('toggleBtn'));
    expect(setToggle).toHaveBeenCalled();
  });

  // test('toggle button changes the toggle state', () => {
  //   render(
  //     <BrowserRouter>
  //       <Header />
  //     </BrowserRouter>
  //   );
  //   const toggleButton = screen.getByTestId('toggleIcon');
  //   fireEvent.click(toggleButton);
  //   expect(toggleButton).toHaveClass('fa-circle-chevron-up');
  //   fireEvent.click(toggleButton);
  //   expect(toggleButton).toHaveClass('fa-circle-chevron-down');
  // });

  test('header title to have the text', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/ReadyRefresh Quick Shop - 5-Gallon Bottle Delivery/i)
    ).toBeInTheDocument();
  });
});
