import { Price } from 'src/types/products';

export const formatPrice = (price: Price | number): string => {
  const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  });

  return formatter.format(typeof price === 'number' ? price : +price);
};
