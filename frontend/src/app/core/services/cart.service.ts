import { Injectable } from '@angular/core';
import { ProductCartItem } from '../../types/cart.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: string) {
    return this.http.post(`${this.apiUrl}/add`, { productId });
  }

  removeFromCart(productId: string) {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, { productId, quantity });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }

  getCartProducts() {
    return this.http.get<ProductCartItem[]>(`${this.apiUrl}/items`);
  }
}
