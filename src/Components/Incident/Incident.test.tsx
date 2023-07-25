import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Incident from './Incident';

describe('<Incident />', () => {
  test('it should mount', () => {
    render(<Incident />);
    
    const incident = screen.getByTestId('Incident');

    expect(incident).toBeInTheDocument();
  });
});