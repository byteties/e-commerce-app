import { Injectable } from '@angular/core';
import { ProductCartItem } from '../../types/cart.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: number): void {
    this.http.post(`${this.apiUrl}/add`, { productId }).subscribe(() => {
    });
  }

  removeFromCart(productId: number): void {
    this.http.delete(`${this.apiUrl}/remove/${productId}`).subscribe(() => {
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.http.post(`${this.apiUrl}/update`, { productId, quantity }).subscribe(() => {
    });
  }

  clearCart(): void {
    this.http.delete(`${this.apiUrl}/clear`).subscribe(() => {
    });
  }

  getCartProducts() {
    return this.http.get<ProductCartItem[]>(`${this.apiUrl}/items`);
  }
}
