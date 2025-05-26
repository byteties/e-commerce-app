import { Product } from "./product.type";

export interface CartItem {
    _id: string;
    quantity: number;
    productId: string;
}

export interface ProductCartItem {
    product: Product;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
}
