import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ProductCartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CheckoutComponent implements OnInit {
  cartProducts: ProductCartItem[] = [];
  cartCount: number = 0;
  totalPrice: number = 0;
  userName: string = '';
  userEmail: string = '';
  userAddress: string = '';

  constructor(
    private cartService: CartService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCartProducts(); 
  }

  toCart() {
    this.router.navigate(['/cart']);
  }

  private getCartProducts() {
    this.cartService.getCartProducts().subscribe((items) => {
      this.cartProducts = items;
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
      this.totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    });
  }

  placeOrder(): void {
    const orderDetails = {
      userName: this.userName,
      userEmail: this.userEmail,
      userAddress: this.userAddress,
      cartItems: this.cartProducts,
      totalPrice: this.totalPrice
    };
    console.info('Order Details:', orderDetails);
    this.snackBar.open('Order Placed Successfully!', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
    this.cartService.clearCart();
    this.router.navigate(['/products']);
  }
}
