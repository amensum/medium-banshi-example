export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IOrder {
  id: number;
  createdAt: Date;
  userId: number;
  item: string;
  price: number;
}
