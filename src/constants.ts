import { FilterGuitarType } from './types/components';

export const MAX_RATING = 5;

export enum ApiRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_1',
  Guitars= '/guitars',
}

export enum QueryRoute {
  CommentsEmbed = '_embed=comments',
  Sort= '&_sort=',
  Type = '&type=',
  Strings = '&stringCount=',
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
