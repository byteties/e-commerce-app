import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductCartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    CommonModule,
    FormsModule, 
    MatIconModule, 
    MatButtonModule, 
    MatInputModule
  ]
})
export class CartComponent implements OnInit {
  cartProducts: ProductCartItem[] = [];
  cartCount: number = 0;
  filterProducts: ProductCartItem[] = [];
  searchText = "";
  private router = inject(Router);

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartProducts()
  }

  private getCartProducts() {
    this.cartService.getCartProducts().subscribe((items) => {
      this.cartProducts = items;
      this.applyFilter(); 
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
    this.getCartProducts();
  }

  async removeFromCart(productId: number): Promise<void> {
    await this.cartService.removeFromCart(productId);
    this.getCartProducts();
  }

  applyFilter() {
    const text = this.searchText.trim().toLocaleLowerCase();
    this.filterProducts = this.cartProducts.filter((product) => 
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text) ||
      product.price.toString().includes(text) ||
      product.details.toLowerCase().includes(text)
    );
  }

  toProductList() {
    this.router.navigate(['/products']);
  }
}
