export type Sort = {
  type: string,
  order: string,
};

export type FilterGuitarType = {
  type: string,
  label: string,
  stringsCount: string[],
};

export type FilterPrice = {
  minPrice: string,
  maxPrice: string,
};
