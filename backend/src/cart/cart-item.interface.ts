import { Product } from "src/products/product.interface";

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface ProductCartItem {
    product: Product;
    quantity: number;
}
  