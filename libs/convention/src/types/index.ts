export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
};

export type IOrder = {
  id: number;
  createdAt: Date;
  userId: number;
  item: string;
  price: number;
};
