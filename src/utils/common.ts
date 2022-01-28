import { RefObject } from 'react';
import { Sort, FilterGuitarType, FilterPrice } from '../types/components';

import {
  ButtonLabel,
  QueryRoute,
  GuitarType,
  OFFERS_TO_SHOW,
  NO_INPUT
} from '../constants';

import { CommentGet,
  GuitarNoComments,
  Guitar
} from '../types/data';

export const getFormattedPrice = (price: number): string => (
  `${price.toLocaleString() } ₽`
);

export const getFormattedType = (type: string): string => (
  GuitarType[capitalizeString(type)]
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

export const filterSimiliarOffers = (offers: GuitarNoComments[], search: string): GuitarNoComments[] => {
  if (search.length > 1) {
    return offers;
  }
  const searchRegExp = new RegExp(`^${search.toLowerCase()}`);
  return offers.filter(({ name }) => name.toLowerCase().match(searchRegExp));
};

export const getDateString = (date: string): string => {
  const commentDate = new Date(date);
  return commentDate.toLocaleString('ru-Ru', { month: 'long', day: '2-digit' });
};

export const sortCommentsByDate = (comments: CommentGet[]): CommentGet[] => (
  [...comments].sort((commentA, commentB) => {
    const dateA = Date.parse(commentA.createAt);
    const dateB = Date.parse(commentB.createAt);
    return dateB - dateA;
  })
);

export const capitalizeString = (string: string): string => (
  string.replace(/^\w/, (c) => c.toUpperCase())
);

export const resetInputText =
  (ref: RefObject<HTMLInputElement | HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.value = '';
    }
  };

export const getInputText =
  (ref: RefObject<HTMLInputElement | HTMLTextAreaElement>) => {
    const message = ' ';
    if (ref.current) {
      return ref.current.value.trim().length ? ref.current.value : message;
    }
    return message;
  };

export const hasInput = (input: string): boolean => input !== NO_INPUT;

export const updateString = (string: string, count: number): string => (
  (parseInt(string, 10) + count).toString()
);

export const getIsInCart = (offerId: number, offers: Guitar[]): boolean => (
  offers.findIndex(({ id }) => id === offerId) >= 0
);

export const getUniqueOffers = (offers: Guitar[]): Guitar[] => [...new Set(offers)];

export const sortOffersById = (offers: Guitar[]) => (
  [...offers].sort((firstOffer, secondOffer) => firstOffer.id - secondOffer.id)
);

export const getSameOffersCount = (offers: Guitar[], offerId: number): number => (
  offers.filter(({ id }) => id === offerId).length
);

export const addOffer = (offers: Guitar[], currentOffer: Guitar): Guitar[] => (
  [...offers, currentOffer]
);

export const removeOffer = (offers: Guitar[], currentOffer: Guitar): Guitar[] => {
  const index = offers.findIndex(({ id }) => id === currentOffer.id);
  return [...offers.slice(0, index), ...offers.slice(index + 1)];
};

export const removeSameOffers = (offers: Guitar[], currentOffer: Guitar): Guitar[] => (
  offers.filter(({ id }) => id !== currentOffer.id)
);

export const updateOffers =
  (offers: Guitar[], currentOffer: Guitar, count: number): Guitar[] => {
    const noCurrentOfferArray = offers.filter(({ id }) => id !== currentOffer.id);
    const offersArray = new Array(count).fill(null).map(() => currentOffer);
    return [...noCurrentOfferArray, ...offersArray];
  };

export const getOnCounterLeaveString =
  (input: string, [minNum, maxNum]: number[]): string => {
    const currentNum = parseInt(input, 10);
    if (!input.length || currentNum < minNum) {
      return minNum.toString();
    }
    if (currentNum > maxNum) {
      return maxNum.toString();
    }
    return input;
  };

export const getTotalPrice = (offers: Guitar[]): number => (
  offers.reduce((prevOffer, currentOffer) => prevOffer + currentOffer.price, 0)
);
