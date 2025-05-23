import { Injectable } from '@nestjs/common';
import { CartItem } from './cart-item.interface';

@Injectable()
export class CartService {

  private cartKey: string = 'cart';

  constructor() {}

  addToCart(productId: number): void {
    const cartItems = this.getCart();
    const existingItem = cartItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ productId, quantity: 1 });
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  removeFromCart(productId: number): void {
    const cartItems = this.getCart();
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(updatedCart));
  }

  updateQuantity(productId: number, quantity: number): void {
    const cartItems = this.getCart();
    const itemIndex = cartItems.findIndex((item) => item.productId === productId);
    
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
    }
  }

  getCart(): CartItem[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  getCartCount(): number {
    const cartItems = this.getCart();
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey); 
  }
}
