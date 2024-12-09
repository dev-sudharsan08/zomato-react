import { render, screen } from '@testing-library/react';
import HomePage from './HomePage'; // Adjust the import path as needed
import { BrowserRouter } from 'react-router-dom';
import ContextAPI from '../../components/ContextAPI/ContextAPI';
const location = {
  states: [
    {
      id: 1,
      stateName: 'Agra Restaurants'
    },
    {
      id: 2,
      stateName: 'Ajmer Restaurants'
    }
  ]
}

describe('HomePage component', () => {
  it('has the below text as header1', () => {
    render(
      <BrowserRouter>
        <ContextAPI>
          <HomePage { ...location }/>
        </ContextAPI>
    </BrowserRouter>
    );
    expect(screen.getByTestId('cuisinePageNav')).toBeInTheDocument();
    expect(screen.getByTestId('cuisinePageNav')).toHaveTextContent('1');
    expect(screen.getByTestId('stateName')).toBeInTheDocument();
    expect(screen.getByTestId('stateName')).toHaveTextContent('Agra Restaurants');
  });
});
