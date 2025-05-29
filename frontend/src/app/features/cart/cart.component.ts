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

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartProducts()
  }

  private getCartProducts() {
    this.cartService.getCartProducts().subscribe((items) => {
      this.cartProducts = items;
      this.applyFilter(); 
    });
  }

  increaseQuantity(productId: string, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1).subscribe(() => {
      this.getCartProducts();
    });
  }

  decreaseQuantity(productId: string, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1).subscribe(() => {
        this.getCartProducts();
      });
    }
  }

  removeFromCart(productId: string): void{
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.getCartProducts();
    })
  }

  applyFilter() {
    const text = this.searchText.trim().toLocaleLowerCase();
    this.filterProducts = this.cartProducts.filter((item) => 
      item?.product?.name?.toLowerCase().includes(text) ||
      item?.product?.category?.toLowerCase().includes(text) ||
      item?.product?.price?.toString().includes(text) ||
      item?.product?.details?.toLowerCase().includes(text)
    );
  }

  toProductList() {
    this.router.navigate(['/products']);
  }

  toCheckoutPage() {
    this.router.navigate(['/checkout']);
  }
}
