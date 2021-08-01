import axios, { AxiosResponse } from 'axios';

import { Product, Products } from './types/products';

interface ProductCheckResponse {
  isError: boolean;
  success: boolean;
  message: string;
  errorType:
    | 'INCORRECT_BODY'
    | 'INCORRECT_TYPE'
    | 'MISSING_PROPERTY'
    | 'NOT_FOUND'
    | 'INCORRECT_QUANTITY';
}

export const getCartProducts = (): Promise<AxiosResponse<Products>> =>
  axios.get<Products>('/api/cart');

export const postCheckProduct = (body: {
  quantity: number;
  pid: Product['pid'];
}): Promise<AxiosResponse<ProductCheckResponse>> =>
  axios.post('/api/product/check', JSON.stringify(body));
