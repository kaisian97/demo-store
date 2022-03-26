export type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: string;
  stars: number;
};

export type Store = {
  name: string;
  value: string;
  currency: string;
  secret: string;
  rate: number;
};
