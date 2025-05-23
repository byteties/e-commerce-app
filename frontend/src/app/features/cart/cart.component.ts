import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem, ProductCartItem } from '../../types/cart.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { forkJoin } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, 
    FormsModule, 
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartProducts: ProductCartItem[] = [];
  cartCount: number = 0;
  filterProducts: ProductCartItem[] = [];
  searchText = ""
  private router = inject(Router);
  
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.cartCount = this.cartService.getCartCount();
      const productObservables = this.cartItems.map(item => 
        this.productService.getProduct(item.productId)
      );
      forkJoin(productObservables).subscribe(products => {
        this.cartProducts = products.map((product, index) => ({
          ...product,
          quantity: this.cartItems[index].quantity
        }));
      });
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  applyFilter(){
    const text = this.searchText.trim().toLocaleLowerCase()
    this.filterProducts = this.cartProducts.filter((product)=> 
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text) ||
      product.price.toString().includes(text) ||
      product.details.toLowerCase().includes(text)
    )
  }

  toProductList(){
    this.router.navigate(['/products'])
  }
}
