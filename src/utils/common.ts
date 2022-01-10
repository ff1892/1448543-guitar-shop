import { Sort, FilterGuitarType, FilterPrice } from '../types/components';
import { ButtonLabel, QueryRoute, OFFERS_TO_SHOW } from '../constants';

export const getFormattedPrice = (price: number): string => (
  `${price.toLocaleString() } ₽`
);

export const getIsStringMatchesTypes =
  (typeState: string[],
    stringsCount: string,
    guitarsData: FilterGuitarType[]): boolean => {

    if (!typeState.length || typeState.length === guitarsData.length) {
      return true;
    }
    const isTypeMatchesStringArray = typeState.map((type) => {
      const currentGuitar = guitarsData.find((guitar) => guitar.type === type);
      return currentGuitar?.stringsCount.includes(stringsCount);
    });
    return isTypeMatchesStringArray.some((element) => element);
  };

export const getIsTypeMatchesStrings =
  (stringState: string[],
    currentType: string,
    guitarsData: FilterGuitarType[],
    stringsData: string[]): boolean => {

    if (!stringState.length || stringState.length === stringsData.length) {
      return true;
    }

    const isStringMatchesTypeArray = stringState.map((string) => {
      const currentGuitar = guitarsData.find((guitar) => guitar.type === currentType);
      return currentGuitar?.stringsCount.includes(string);
    });
    return isStringMatchesTypeArray.some((element) => element);
  };

export const getSortQuery = ({ type, order }: Sort): string => {
  if (!(type && order)) {
    return '';
  }
  const orderString = order === ButtonLabel.Ascending ? '' : '&_order=desc';
  return `&_sort=${type}${orderString}`;
};

export const getPriceQuery = (state: FilterPrice): string => {
  const { minPrice, maxPrice } = state;
  const minQuery = minPrice !== '' ? `${QueryRoute.MinPrice}${minPrice}` : '';
  const maxQuery = maxPrice !== '' ? `${QueryRoute.MaxPrice}${maxPrice}` : '';
  return minQuery + maxQuery;
};

export const getQuery = (query: string, state: string[]): string => {
  if (!state.length) {
    return '';
  }
  return state.map((item) => `${query}${item}`).join('');
};

export const getPageQuery = (query: number): string => `&_start=${(query - 1) * OFFERS_TO_SHOW}&_limit=${OFFERS_TO_SHOW}`;


export const validatePrice = (password: string): string => {
  const numberReg = /^[0-9]*$/;
  if (numberReg.test(password)) {
    return '';
  }
  return 'Укажите положительное число';
};

