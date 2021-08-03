import React, { useEffect, useState } from 'react';

import { Product } from 'src/components/Product/Product';

import { ProductWithQuantity } from 'src/types/products';
import { States, StateTypes } from 'src/types/global';

import { getCartProducts } from 'src/api';
import { formatPrice } from 'src/utilities/priceHelpers';

import './App.css';

const sumPrice = (products: ProductWithQuantity[]) =>
  products.reduce((acc, next) => acc + next.quantity * Number(next.price), 0);

const App = (): JSX.Element => {
  const [productsState, setProductsState] = useState<
    States<ProductWithQuantity[]>
  >({
    type: StateTypes.IDLE,
  });

  useEffect(() => {
    const getProducts = async () => {
      setProductsState({ type: StateTypes.LOADING });
      try {
        const { data } = await getCartProducts();
        // API doesnt provide us an information about quantity, so initial quantity has been set to min
        const productWithQuantity = data.map<ProductWithQuantity>(
          (_product) => ({
            ..._product,
            quantity: _product.min,
          }),
        );
        setProductsState({
          type: StateTypes.SUCCESS,
          data: productWithQuantity,
        });
      } catch (e) {
        setProductsState({
          type: StateTypes.ERROR,
          error: { message: 'Ops... Something is wrong... Try again later' },
        });
      }
    };

    getProducts();
  }, []);

  const syncProductQuantity = (
    productToSync: Pick<ProductWithQuantity, 'quantity' | 'pid'>,
  ) => {
    if (productsState.type === StateTypes.SUCCESS) {
      const syncedProducts = productsState.data.map((_product) =>
        _product.pid === productToSync.pid
          ? { ..._product, quantity: productToSync.quantity }
          : _product,
      );

      setProductsState((state) => ({
        ...state,
        data: syncedProducts,
      }));
    }
  };

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      {productsState.type === StateTypes.LOADING && (
        <p>Pobieranie listy produktów...</p>
      )}
      {productsState.type === StateTypes.ERROR && (
        <p>{productsState.error.message}</p>
      )}
      {productsState.type === StateTypes.SUCCESS && (
        <div data-testid="products-list">
          <ul>
            {productsState.data.map(
              ({ pid, min, max, price, isBlocked, name, quantity }) => (
                <Product
                  key={pid}
                  pid={pid}
                  name={name}
                  min={min}
                  max={max}
                  price={price}
                  isBlocked={isBlocked}
                  initialQuantity={quantity}
                  syncCartData={syncProductQuantity}
                />
              ),
            )}
          </ul>
          <div>
            Całkowity koszt wynosi {formatPrice(sumPrice(productsState.data))}
          </div>
        </div>
      )}
    </div>
  );
};

export { App };
