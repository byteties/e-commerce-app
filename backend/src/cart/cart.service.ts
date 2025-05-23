import { Injectable } from '@nestjs/common';
import { CartItem, ProductCartItem } from './cart-item.interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  constructor(private readonly productService: ProductsService) {}

  addToCart(productId: number): void {
    const existingItem = this.cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;  
    } else {
      this.cart.push({ productId, quantity: 1 });  
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter((item) => item.productId !== productId);  
  }

  updateQuantity(productId: number, quantity: number): void {
    const itemIndex = this.cart.findIndex((item) => item.productId === productId);
    
    if (itemIndex !== -1) {
      this.cart[itemIndex].quantity = quantity;  
    }
  }

  getCart(): CartItem[] {
    return this.cart;  
  }

  clearCart(): void {
    this.cart = [];  
  }

  getCartProducts(): ProductCartItem[] {
    return this.cart.map((item) => {
      const product = this.productService.getProduct(item.productId.toString());
      return {
        ...product,
        quantity: item.quantity
      };
    });
  }
}
