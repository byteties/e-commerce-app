import { Types } from "mongoose";
import { Product } from "../products/product.interface";

export interface CartItem {
    productId: string | Types.ObjectId;
    quantity: number;
}

export interface ProductCartItem {
    product: Product;
    quantity: number;
}
  