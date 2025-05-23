import { Product } from "./product.type";

export interface CartItem {
    productId: number;  
    quantity: number;
}

export interface ProductCartItem extends Product {
    quantity: number;
}
