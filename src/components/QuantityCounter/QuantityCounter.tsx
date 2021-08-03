import React, { memo } from 'react';

interface Props {
  min: number;
  max: number;
  isBlocked?: boolean;
  quantity: number;
  onClick: (delta: number) => () => void;
}

const QuantityCounter = memo((props: Props): JSX.Element => {
  const { min, max, isBlocked, onClick, quantity } = props;

  return (
    <div>
      <button
        data-testid="quantity-counter-button-decrease"
        type="button"
        onClick={onClick(-1)}
        disabled={isBlocked || quantity <= min}
      >
        -
      </button>
      <button
        data-testid="quantity-counter-button-increase"
        type="button"
        onClick={onClick(1)}
        disabled={isBlocked || quantity >= max}
      >
        +
      </button>
      <div>Obecnie masz {quantity} sztuk produktu</div>
    </div>
  );
});

QuantityCounter.displayName = 'QuantityCounter';

export { QuantityCounter };
