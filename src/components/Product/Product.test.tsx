import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Product } from './Product';

jest.mock('axios');

afterEach(() => {
  jest.useRealTimers();
});

describe('<Product />', () => {
  test('should render correctly', () => {
    render(
      <Product
        min={1}
        max={10}
        initialQuantity={1}
        name="Garnek"
        price="39.39"
        pid="8e5e1248-c799-4937-9acc-2b3ab0e034ff"
        isBlocked={false}
        syncCartData={jest.fn()}
      />,
    );

    expect(screen.getByTestId('product-component')).toBeInTheDocument();
  });

  test('should call onCounterClick and increase quantity on QuantityCounter button click', async () => {
    render(
      <Product
        min={1}
        max={10}
        initialQuantity={1}
        name="Garnek"
        price="39.39"
        pid="8e5e1248-c799-4937-9acc-2b3ab0e034ff"
        isBlocked={false}
        syncCartData={jest.fn()}
      />,
    );

    const increaseButton = screen.getByTestId(
      'quantity-counter-button-increase',
    );

    fireEvent.click(increaseButton);

    await screen.findByText(/^Obecnie masz/i);

    expect(screen.getByText(/^Obecnie masz/i)).toHaveTextContent(
      'Obecnie masz 2 sztuk produktu',
    );
  });

  test('should call syncCartData callback prop on 200 server response', async () => {
    const mockFunction = jest.fn();
    (axios.post as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: { success: true } }),
    );
    jest.useFakeTimers();
    render(
      <Product
        min={1}
        max={20}
        initialQuantity={1}
        name="Garnek"
        price="39.39"
        pid="8e5e1248-c799-4937-9acc-2b3ab0e034ff"
        isBlocked={false}
        syncCartData={mockFunction}
      />,
    );

    const increaseButton = screen.getByTestId(
      'quantity-counter-button-increase',
    );

    userEvent.click(increaseButton);
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFunction).toHaveBeenCalledWith({
      pid: '8e5e1248-c799-4937-9acc-2b3ab0e034ff',
      quantity: 2,
    });
  });

  test('should call syncCartData callback prop on 406 server response and call with min quantity value', async () => {
    const mockFunction = jest.fn();
    (axios.post as jest.Mock).mockImplementation(() => Promise.reject());
    jest.useFakeTimers();

    render(
      <Product
        min={1}
        max={20}
        initialQuantity={10}
        name="Garnek"
        price="39.39"
        pid="8e5e1248-c799-4937-9acc-2b3ab0e034ff"
        isBlocked={false}
        syncCartData={mockFunction}
      />,
    );

    const increaseButton = screen.getByTestId(
      'quantity-counter-button-increase',
    );

    userEvent.click(increaseButton);
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFunction).toHaveBeenCalledWith({
      pid: '8e5e1248-c799-4937-9acc-2b3ab0e034ff',
      quantity: 1,
    });
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Obecnie masz/i)).toHaveTextContent(
      'Obecnie masz 1 sztuk produktu',
    );
  });
});
