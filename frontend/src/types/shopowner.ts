export type ShopOwner = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  phone: number;
  shop_name: string;
  category_name?: string;
  password: string;
  image: string[];
  created_at?: string;
};