import React from 'react';
import { render, screen } from '@testing-library/react';

import { QuantityCounter } from './QuantityCounter';

describe('<QuantityCounter />', () => {
  test('should render disabled button', () => {
    render(
      <QuantityCounter
        min={1}
        max={10}
        quantity={1}
        isBlocked
        onClick={jest.fn()}
      />,
    );

    expect(
      screen.getByTestId('quantity-counter-button-decrease'),
    ).toHaveAttribute('disabled');
    expect(
      screen.getByTestId('quantity-counter-button-increase'),
    ).toHaveAttribute('disabled');
  });
});
