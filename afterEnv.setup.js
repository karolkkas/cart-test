import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

import cart from './config/cart.json';

const server = setupServer(
  rest.post('/api/product/check', (req, res, ctx) => {
    if (JSON.parse(req.body).quantity < 11) {
      return res(ctx.status(200), ctx.json({ success: true }));
    }
    return res(ctx.status(406));
  }),
  rest.get('/api/cart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cart));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
