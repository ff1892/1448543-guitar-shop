import { FilterGuitarType } from './types/components';

export const MAX_RATING = 5;
export const OFFERS_TO_SHOW = 9;
export const INITIAL_PAGE = 1;
export const TOTAL_COUNT_HEADER = 'x-total-count';
export const NO_INPUT = ' ';

export enum ApiRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  InitialPage = '/page_1',
  Start = '/catalog/page_1',
  Page = '/page_',
  Guitars= '/guitars',
  About='/about',
  Shops='/shops',
  Cart='/cart',
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

export enum HistoryRoute {
  InitialPagePathname = 'page_1',
  PagePathName = 'page_',
  StringCount = 'stringCount',
  Type = 'type',
  MinPrice = 'price_gte',
  MaxPrice = 'price_lte',
  Sort = 'sort',
  Order = 'order',
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

export const GuitarType: { [key: string]: string } = {
  'Electric': 'Электрогитара',
  'Acoustic': 'Акустическая гитара',
  'Ukulele': 'Укулеле',
};

export enum UploadStatus {
  Unknown = 'UNKNOWN',
  Posting = 'POSTING',
  Completed = 'COMPLETED',
  Error = 'ERROR',
}

export enum OrderCount {
  Min = 1,
  Max = 99,
}
