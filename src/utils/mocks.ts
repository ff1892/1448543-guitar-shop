import { Guitar, CommentGet, GuitarNoComments } from '../types/data';
import { State } from '../types/state';
import { internet, datatype, lorem, commerce } from 'faker';

export const makeFakeComment = (): CommentGet => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantages: lorem.words(),
  disadvantages: lorem.words(),
  comment: lorem.sentence(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toLocaleDateString(),
  guitarId: datatype.number(),
});

export const makeFakeComments = (): CommentGet[] => (
  new Array(3).fill(null).map(makeFakeComment)
);

export const makeFakeGuitarNoComments = (): GuitarNoComments => ({
  id: datatype.number(),
  name: lorem.word(),
  vendorCode: datatype.string(),
  type: commerce.product(),
  description: commerce.productDescription(),
  previewImg: internet.avatar(),
  stringCount: datatype.number(12),
  rating: datatype.number(5),
  price: datatype.number(20000),
});

export const makeFakeGuitarsNoComments = (): GuitarNoComments[] => (
  new Array(3).fill(null).map(makeFakeGuitarNoComments)
);

export const makeFakeGuitar = (): Guitar => ({
  ...makeFakeGuitarNoComments(),
  comments: makeFakeComments(),
});

export const makeFakeGuitars = (): Guitar[] => (
  new Array(3).fill(null).map(makeFakeGuitar)
);

export const getFakeStore = (): State => {

  const fakeGuitars = makeFakeGuitars();
  const fakeGuitarsNoComments = makeFakeGuitarsNoComments();

  return {
    DATA_OFFERS: {
      totalCount: fakeGuitars.length,
      allOffers: fakeGuitars,
      isAllOffersLoaded: true,
      isAllOffersError: false,
      priceOffers: fakeGuitars,
      isPriceOffersLoaded: true,
      isPriceOffersError: false,
      similiarOffers: fakeGuitarsNoComments,
      similiarOffersSearch: '',
      isSimiliarOffersLoaded: true,
      isSimiliarOffersError: false,
    },
    STATE_FILTER: {
      filterType: [datatype.string()],
      filterStrings: [datatype.string()],
      filterPrice: { minPrice: commerce.price(), maxPrice: commerce.price() },
    },
    STATE_SORT: {
      sort: { type: datatype.string(), order: datatype.string()},
    },
    STATE_PAGE: {
      page: datatype.number(3),
    },
  };
};
