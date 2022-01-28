export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments: CommentGet[],
};

export type GuitarNoComments = Omit<Guitar, 'comments'>;

export type CommentGet = {
  id: string,
  createAt: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
};

export type CommentPost = Omit<CommentGet, 'id' | 'createAt'>;

export type Coupon = string | null;

export type CouponPost = {
  coupon: Coupon,
};
