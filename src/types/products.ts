export type Price = string;
export type Currency = 'zł';

export interface Product {
  pid: string;
  name: string;
  price: Price;
  max: number;
  min: number;
  isBlocked?: boolean;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export type Products = Product[];
