import { formatPrice } from './priceHelpers';

describe('utilities/priceHelpers', () => {
  // Intl returns string with space as Unicode 160 (nbsp), when normal string as a space has Unicode 32
  const replaceNbsps = (str: string) => {
    const re = new RegExp(String.fromCharCode(160), 'g');
    return str.replace(re, ' ');
  };

  test('returns correctly formatted price when input is string', () => {
    const value = '39.678';
    const expectedPrice = '39,68 zł';
    const formattedPrice = replaceNbsps(formatPrice(value));
    expect(formattedPrice).toEqual(expectedPrice);
  });

  test('returns correctly formatted price when input is number', () => {
    const value = 39.678;
    const expectedPrice = '39,68 zł';
    const formattedPrice = replaceNbsps(formatPrice(value));
    expect(formattedPrice).toEqual(expectedPrice);
  });
});
