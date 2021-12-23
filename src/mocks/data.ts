import { Guitar } from '../types/data';

const guitarItem: Guitar = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 2,
  price: 1700,
};

export const guitarList = new Array(9).fill(null).map((item, index) => ({
  ...guitarItem, id: index + 1}),
);
