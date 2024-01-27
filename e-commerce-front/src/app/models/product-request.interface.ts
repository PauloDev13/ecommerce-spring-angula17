export interface ProductRequestInterface {
  name: string;
  price: number;
  description: string;
  category_id: number;
  byteImg?: string;
  img?: File;
}
