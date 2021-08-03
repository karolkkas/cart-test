import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { App } from './App';
import cart from '../../../config/cart.json';

jest.mock('axios');

afterEach(() => {
  jest.useRealTimers();
});

describe('<App />', () => {
  test('should show loading state', () => {
    act(() => {
      render(<App />);
    });

    expect(screen.getByText(/Pobieranie/i)).toBeInTheDocument();
  });

  test('should show fetched products', async () => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: cart }),
    );
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByTestId('products-list')).toBeInTheDocument();
  });

  test('should show error message on catch', async () => {
    (axios.get as jest.Mock).mockImplementation(() => Promise.reject());
    await act(async () => {
      render(<App />);
    });
    expect(
      screen.getByText('Ops... Something is wrong... Try again later'),
    ).toBeInTheDocument();
  });

  test('should synchronize cart data after increasing of quantity', async () => {
    jest.useFakeTimers();
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: cart }),
    );
    (axios.post as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: { success: true } }),
    );
    await act(async () => {
      render(<App />);
    });
    const firstProductIncreaseButton = screen.getAllByTestId(
      'quantity-counter-button-increase',
    )[0];
    userEvent.click(firstProductIncreaseButton);
    await act(async () => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getAllByText(/^Obecnie masz/i)[0]).toHaveTextContent(
      'Obecnie masz 2 sztuk produktu',
    );
  });
});
