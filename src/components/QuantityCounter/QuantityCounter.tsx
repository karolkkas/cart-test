import React, { memo, useCallback } from 'react';

interface Props {
  min: number;
  max: number;
  isBlocked?: boolean;
  quantity: number;
  onClick: (count: number) => void;
}

const QuantityCounter = memo((props: Props): JSX.Element => {
  const { min, max, isBlocked, onClick, quantity } = props;

  const onButtonClick = useCallback(
    (delta: number) => () => {
      onClick(quantity + delta);
    },
    [quantity, onClick],
  );

  return (
    <div>
      <button
        type="button"
        onClick={onButtonClick(-1)}
        disabled={isBlocked || quantity <= min}
      >
        -
      </button>
      <button
        type="button"
        onClick={onButtonClick(1)}
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
