import { FilterGuitarType } from './types/components';

export const MAX_RATING = 5;
export const OFFERS_TO_SHOW = 9;
export const INITIAL_PAGE = 1;
export const TOTAL_COUNT_HEADER = 'x-total-count';

export enum ApiRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_',
  Guitars= '/guitars',
}

export enum QueryRoute {
  CommentsEmbed = '_embed=comments',
  Sort= '&_sort=',
  Type = '&type=',
  Strings = '&stringCount=',
  SortPrice = '_sort=price',
  MinPrice = '&price_gte=',
  MaxPrice = '&price_lte=',
  Similiar = 'name_like=',

}

export enum ButtonLabel {
  Price = 'price',
  Rating = 'rating',
  Ascending = 'asc',
  Descending = 'desc',
}

export const filterGuitarsData: FilterGuitarType[] = [
  {
    type: 'acoustic',
    label: 'Акустические гитары',
    stringsCount: ['6', '7', '12'],
  },
  {
    type: 'electric',
    label: 'Электрогитары',
    stringsCount: ['4', '6', '7'],
  },
  {
    type: 'ukulele',
    label: 'Укулеле',
    stringsCount: ['4'],
  },
];

export const filterStringsData = ['4', '6', '7', '12'];
