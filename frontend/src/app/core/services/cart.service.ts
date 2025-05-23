import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../types/cart.type';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();
  constructor() {}

  addToCart(productId: number): void {
    const index = this.cartItems.findIndex(item => item.productId === productId);
    if (index !== -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push({ productId, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const index = this.cartItems.findIndex(item => item.productId === productId);
    if (index !== -1 && quantity > 0) {
      this.cartItems[index].quantity = quantity;
      this.cartSubject.next(this.cartItems);
    }
  }

  getCartCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}
