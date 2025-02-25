import { Guitar, CommentGet, GuitarNoComments, CommentPost } from '../types/data';
import { State } from '../types/state';
import { internet, datatype, lorem, commerce } from 'faker';

export const makeFakeComment = (): CommentGet => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  comment: lorem.sentence(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toLocaleDateString(),
  guitarId: datatype.number(),
});

export const makeFakeCommentPost = (): CommentPost => ({
  userName: internet.userName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  comment: lorem.sentence(),
  rating: datatype.number(5),
  guitarId: datatype.number(),
});

export const makeFakeComments = (count: number): CommentGet[] => (
  new Array(count).fill(null).map(makeFakeComment)
);

export const makeFakeGuitarNoComments = (): GuitarNoComments => ({
  id: datatype.number(),
  name: internet.userName(),
  vendorCode: datatype.uuid(),
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
  comments: makeFakeComments(3),
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
    DATA_CURRENT_OFFER: {
      currentOffer: fakeGuitars[0],
      isCurrentOfferLoaded: true,
      isCurrentOfferError: false,
    },
    DATA_COMMENT: {
      commentStatus: 'UNKNOWN',
    },
    DATA_CART: {
      cartOffers: fakeGuitars,
    },
    DATA_COUPON: {
      discount: 0,
      coupon: null,
      couponStatus: 'UNKNOWN',
    },
  };
};
