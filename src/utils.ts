import { Guitar } from './types/data';
import { Sort, FilterGuitarType, FilterPrice } from './types/components';
import { ButtonLabel } from './constants';

export const getFormattedPrice = (price: number): string => (
  `${price.toLocaleString() } ₽`
);

const filterNameByQuery = (name: string, query: string): boolean => {
  const lowerCaseName = name.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();
  const indexFind = lowerCaseName.indexOf(lowerCaseQuery);
  return indexFind !== -1;
};

export const getFilteredOffersByName = (query: string, offers: Guitar[]): Guitar[] => {
  const trimmedQuery = query.replace(/^\s+/, '');
  if (!trimmedQuery) {
    return [];
  }
  return offers.filter(({ name }) => filterNameByQuery(name, trimmedQuery));
};

export const getMinMaxPrice = (offers: Guitar[]) => {
  const minPrice = Math.min(...offers.map(({ price }) => price));
  const maxPrice = Math.max(...offers.map(({ price }) => price));
  return { minPrice, maxPrice };
};

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
  const minQuery = minPrice !== '' ? `&price_gte=${minPrice}` : '';
  const maxQuery = maxPrice !== '' ? `&price_lte=${maxPrice}` : '';
  return minQuery + maxQuery;
};

export const getQuery = (query: string, state: string[]): string => {
  if (!state.length) {
    return '';
  }
  return state.map((item) => `${query}${item}`).join('');
};


export const validatePrice = (password: string): string => {
  const passwordReg = /^[0-9]*$/;
  if (passwordReg.test(password)) {
    return '';
  }
  return 'Укажите положительное число';
};

