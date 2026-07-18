export type Product = {
  id: number;
  title: string;
  price: number;
  discounted_price: number;
  quantity: number;
  description: string;
  reviews: number;
  thumbnail: string[];
  preview: string[];
  shopowner_id: number;
  created_at?: string;
  category_id: number;
  location: string;
  condition_type:string;
};