import React, { memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Product, ProductWithQuantity } from 'src/types/products';

import { formatPrice } from 'src/utilities/priceHelpers';

import { QuantityCounter } from 'src/components/QuantityCounter/QuantityCounter';
import { postCheckProduct } from 'src/api';

interface Props extends Product {
  initialQuantity: number;
  syncCartData: (
    productToSync: Pick<ProductWithQuantity, 'quantity' | 'pid'>,
  ) => void;
}

const Product = memo((props: Props): JSX.Element => {
  const {
    min,
    max,
    name,
    pid,
    price,
    isBlocked,
    initialQuantity,
    syncCartData,
  } = props;
  const [quantity, setQuantity] = useState(initialQuantity);
  const debounced = useDebouncedCallback((_quantity: number) => {
    postCheckProduct({ pid, quantity: _quantity })
      .then(({ data }) => {
        if (data.success) {
          syncCartData({
            pid,
            quantity: _quantity,
          });
        }
      })
      .catch(() => {
        setQuantity(min);
        syncCartData({
          pid,
          quantity: min,
        });
      });
  }, 500);

  const onCounterClick = (count: number) => {
    setQuantity(count);
    debounced(count);
  };

  return (
    <li className="row">
      <div>
        {name}, cena: {formatPrice(price)}
      </div>
      <QuantityCounter
        min={min}
        max={max}
        quantity={quantity}
        isBlocked={isBlocked}
        onClick={onCounterClick}
      />
    </li>
  );
});

Product.displayName = 'Product';

export { Product };
