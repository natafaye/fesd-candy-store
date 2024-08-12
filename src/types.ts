export type CartItem = {
  id: number;
  productId: number;
  amount: number;
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  flavor: string;
  weight: string;
  price: number;
  quantityInStock: number;
  expirationDate: string;
};
